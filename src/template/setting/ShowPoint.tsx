"use client";

import Form from "next/form";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState, useEffect } from "react";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { upsertShowPoint } from "@/src/lib/models/setting";

interface ShowPointProps {
  isShowPoint?: boolean;
}

const ShowPoint = ({ isShowPoint = true }: ShowPointProps) => {
  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(upsertShowPoint);

  const [showPoint, setShowPoint] = useState<boolean>(isShowPoint);

  useEffect(() => {
    setShowPoint(isShowPoint);
  }, [isShowPoint]);

  const handleToggle = () => {
    setShowPoint(!showPoint);
  };

  return (
    <div className="w-full space-y-6">
      <Form action={handleSubmit}>
        {/* checkboxのchecked属性を利用 - チェックされていれば"on"、されていなければundefined */}
        <input
          type="checkbox"
          name="isShowPoint"
          checked={showPoint}
          onChange={() => {}} // Formで制御されるので空でOK
          className="sr-only"
        />

        <div className="center">
          <button
            type="submit"
            onClick={handleToggle}
            className={`relative inline-flex h-8 w-15 items-center rounded-full  transition-transform ${
              showPoint ? "bg-primary-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 rounded-full bg-white transition-transform ${
                showPoint ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className="ml-2 text-primary-800  font-bold">
            {showPoint ? "表示" : "非表示"}
          </span>
        </div>

        <ToastButton
          toastMessage={toastMessage}
          toastColor={toastColor}
          redirect={redirect}
          className="hidden"
        >
          {isPending ? "保存中..." : "保存"}
        </ToastButton>
      </Form>
    </div>
  );
};

export default ShowPoint;
