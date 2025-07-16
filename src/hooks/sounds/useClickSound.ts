"use client";

import { useRef, useCallback } from "react";

interface WebKitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export const useClickSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current && !isInitializedRef.current) {
      try {
        const webkitWindow = window as WebKitWindow;
        const AudioContextClass =
          window.AudioContext || webkitWindow.webkitAudioContext;

        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
          isInitializedRef.current = true;
        }
      } catch (error) {
        console.log("AudioContext failed:", error);
      }
    }
  }, []);

  const playClick = useCallback(() => {
    // 初回は初期化
    if (!isInitializedRef.current) {
      initAudio();
    }

    try {
      if (audioContextRef.current) {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        const currentTime = audioContextRef.current.currentTime;

        // iPhoneスタイルのクリック音
        oscillator.frequency.setValueAtTime(250, currentTime); // 開始周波数
        oscillator.frequency.exponentialRampToValueAtTime(
          200,
          currentTime + 0.05
        ); // 終了周波数
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.2, currentTime); // 音量（0.1〜1.0）
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.1);

        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.1);
      }

      // バイブレーション
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
    } catch (error) {
      console.log("Sound play failed:", error);
    }
  }, [initAudio]);

  return { playClick };
};
