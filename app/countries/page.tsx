import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export default async function Index() {

  const supabase = createServerComponentClient({ cookies });

  const { data: countries } = await supabase.from("countries").select();

  return (
    <ul className="my-auto text-foreground">
      {countries?.map((country) => (
        <li key={country.id}>{country.name} - {country.iso3} - {country.local_name}</li>
      ))}
    </ul>
  );
}