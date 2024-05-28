"use client"
import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "./Icons";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
    <Switch
      defaultSelected
      isSelected={resolvedTheme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  );
};