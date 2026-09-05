"use client";

import { useEffect, useRef } from "react";
import type { WebGLFluidOptions } from "webgl-fluid";

interface FluidBackgroundProps {
  className?: string;
}

export function FluidBackground({ className = "" }: FluidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isCancelled = false;
    let cleanupListeners: (() => void) | undefined;
    const options: WebGLFluidOptions = {
      TRIGGER: "hover",
      IMMEDIATE: true,
      AUTO: false,
      INTERVAL: 3000,
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 1.25,
      VELOCITY_DISSIPATION: 1.0,
      PRESSURE: 0.25,
      PRESSURE_ITERATIONS: 20,
      CURL: 0, // Silk-like flow without violent vorticity
      SPLAT_RADIUS: 0.18,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
      BLOOM: false, // Turned off to avoid wash-out on light background
      SUNRAYS: false,
    };

    const initFluid = async () => {
      // Respect user's motion preference
      if (
        typeof window === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Check WebGL availability
      try {
        const testCanvas = document.createElement("canvas");
        const gl =
          testCanvas.getContext("webgl2") ||
          testCanvas.getContext("webgl") ||
          testCanvas.getContext("experimental-webgl");
        if (!gl) return;
      } catch {
        return;
      }

      try {
        const WebGLFluid = (await import("webgl-fluid")).default;
        if (isCancelled || !canvasRef.current) return;

        WebGLFluid(canvasRef.current, options);

        // Forward pointer moves from child hero elements to canvas so fluid responds anywhere
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (container && canvas) {
          const handlePointerMove = (e: PointerEvent) => {
            if (e.target === canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
              const simEvent = new MouseEvent("mousemove", {
                clientX: e.clientX,
                clientY: e.clientY,
                bubbles: false,
              });
              Object.defineProperty(simEvent, "offsetX", { value: x });
              Object.defineProperty(simEvent, "offsetY", { value: y });
              canvas.dispatchEvent(simEvent);
            }
          };

          container.addEventListener("pointermove", handlePointerMove, {
            passive: true,
          });
          cleanupListeners = () => {
            container.removeEventListener("pointermove", handlePointerMove);
          };
        }
      } catch (err) {
        console.warn("Failed to initialize WebGL fluid background:", err);
      }
    };

    initFluid();

    return () => {
      isCancelled = true;
      options.PAUSED = true;
      if (cleanupListeners) {
        cleanupListeners();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 transition-opacity duration-700"
      />
    </div>
  );
}
