import { Card, CardHeader, CardContent, CardFooter } from "@/shared/ui/card";
import React from "react";

export function AuthLayout({
  form,
  title,
  description,
  cardFooter,
}: {
  form: React.ReactNode;
  title: string;
  description: string;
  cardFooter: React.ReactNode;
}) {
  return (
    <main className="grow flex flex-col pt-[200px] items-center w-full">
      <Card
        className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm fade-in-up max-w-[400px] w-full"
        style={{ animationDelay: "0.2s" }}
      >
        <CardHeader>
          <div className="text-center mb-8 fade-in-up">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-slate-600">{description}</p>
          </div>
        </CardHeader>
        <CardContent className="p-8 w-full">{form}</CardContent>
        <CardFooter>{cardFooter}</CardFooter>
      </Card>
    </main>
  );
}
