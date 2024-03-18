import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
return (
  <div> Landing Page
    <div>
  <Link href="/sign-in">
    <Button>
      Giris
    </Button>
  </Link>
  <Link href="/sign-up">
    <Button>
      Uye Ol
    </Button>
  </Link>
  </div>
  </div>
  );
}
export default LandingPage;