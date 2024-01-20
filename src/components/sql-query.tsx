"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
// import { toast } from "~/components/ui/use-toast";

import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { useState } from "react";

const formSchema = z.object({
  statement: z.string(),
});

const SQLQuery = () => {
  const [data, setData] = useState<string>("");
  const executeQuery = api.message.query.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setData(JSON.stringify(data.rows[0]));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    executeQuery.mutate(values.statement);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="statement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SQL Statement</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is the SQL statement that will be executed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Execute</Button>
        </form>
      </Form>
      {data && <pre>{data.toString()}</pre>}
    </div>
  );
};

export default SQLQuery;
