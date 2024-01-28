"use client";
import { permanentRedirect } from "next/navigation";
import { useEffect } from "react";
import { initJuno } from "@junobuild/core-peer";
import { useNav } from "../context/nav_context";
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function Profile() {
  const { user } = useNav();

  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "tw7oh-ryaaa-aaaal-adoya-cai",
      }))();
  }, []);


  permanentRedirect("/dashboard/earn");

}
