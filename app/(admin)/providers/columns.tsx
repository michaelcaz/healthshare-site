"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Provider = {
  id: string
  name: string
  description: string
  website_url: string
  trust_score: number
  created_at: string
}

export const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link 
          href={`/providers/${row.original.id}`}
          className="font-medium hover:underline"
        >
          {row.getValue("name")}
        </Link>
      )
    }
  },
  {
    accessorKey: "website_url",
    header: "Website",
    cell: ({ row }) => {
      const url = row.getValue("website_url") as string
      return (
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {new URL(url).hostname}
        </a>
      )
    }
  },
  {
    accessorKey: "trust_score",
    header: "Trust Score",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const provider = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/providers/${provider.id}`}>
                Edit Provider
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/providers/${provider.id}/plans`}>
                Manage Plans
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 