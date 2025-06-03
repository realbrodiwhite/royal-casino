
"use client";

import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AutospinSwitchProps {
  isAutospin: boolean;
  onToggle: (isAutospin: boolean) => void;
  disabled?: boolean;
}

const AutospinSwitch: React.FC<AutospinSwitchProps> = ({ isAutospin, onToggle, disabled = false }) => {
  return (
    <div className="flex items-center space-x-2 my-4">
      <Switch
        id="autospin-mode"
        checked={isAutospin}
        onCheckedChange={onToggle}
        disabled={disabled}
        aria-label="Toggle Autospin"
      />
      <Label htmlFor="autospin-mode" className="text-silver">
        Autospin
      </Label>
    </div>
  );
};

export default AutospinSwitch;
