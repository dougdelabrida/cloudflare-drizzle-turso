import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: text("id"),
  content: text("content"),
});
