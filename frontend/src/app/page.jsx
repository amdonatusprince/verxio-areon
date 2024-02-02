"use client";
import { permanentRedirect } from "next/navigation";
import { useNav } from "../context/nav_context";


export default function Profile() {
  const { user } = useNav();

      permanentRedirect("/dashboard/earn");

}
