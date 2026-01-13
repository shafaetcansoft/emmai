import api from "@/lib/Axios/api";
import { notFound } from "next/navigation";
type PageProps = {
  params: Promise<{ subdomain: string }>;
};

async function validateClinic(subdomain: string) {
  try {
    const res = await api.get(`/api/clinics/check-subdomain`, {
      params: { subdomain: subdomain },
    });
    console.log("Clinic validation response:", res.data.data.available);
    return res.data.data.available === false;
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Error checking subdomain");
  }
}

export default async function ClinicPage({ params }: PageProps) {
  const { subdomain } = await params;

  const isValid = await validateClinic(subdomain);
  if (!isValid) notFound();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome to <span className="text-green-500">{subdomain}</span> Clinic
      </h1>
    </div>
  );
}
