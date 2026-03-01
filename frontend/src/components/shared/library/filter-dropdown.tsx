"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type FilterOption = {
  label: string
  value: string
}

type FilterDropdownProps = {
  title?: string
  options: FilterOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}

export function FilterDropdown({
  title = "フィルター",
  options,
  selectedValues,
  onChange,
}: FilterDropdownProps) {
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  )

  const selectedLabel =
    selectedOptions.length === 0
      ? title
      : selectedOptions.length === 1
        ? selectedOptions[0].label
        : `${selectedOptions[0].label} +${selectedOptions.length - 1}`

  const handleCheckedChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionValue])
      return
    }
    onChange(selectedValues.filter((value) => value !== optionValue))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-40 justify-between">
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) =>
                handleCheckedChange(option.value, checked === true)
              }
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
