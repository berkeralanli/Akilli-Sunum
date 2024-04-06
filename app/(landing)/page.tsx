import { LandingHero2 } from "@/components/LandingHero2";
import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingContent } from "@/components/LandingContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
return (
  <div className="w-full h-full">
    <LandingNavbar/>
    <LandingHero2/>
    {/* <LandingContent /> */}
  </div>
  );
}
export default LandingPage;