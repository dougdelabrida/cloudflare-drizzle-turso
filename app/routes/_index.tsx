import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { db } from "drizzle/db";
import { notes } from "drizzle/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const bodyData = await request.formData();
  const content = bodyData.get("content") as string | null;

  if (content) {
    const randomCharId = Math.random().toString(36).substring(7);
    db.insert(notes).values({ content, id: randomCharId }).run();
  }

  return json({ ok: true });
}

export async function loader() {
  const result = await db.select().from(notes).all();
  return json({ notes: result });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <Form method="post">
        <input type="text" name="content" />
        <button type="submit">Add Note</button>
      </Form>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Notes</h1>
        <ul>
          {data.notes.map((note, i) => (
            <li key={`note.id-${i}`}>{note.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
