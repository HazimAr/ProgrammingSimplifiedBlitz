import { resolver, SecurePassword } from "blitz";
import db from "db";
import { Register } from "app/auth/validations";

export default resolver.pipe(resolver.zod(Register), async ({ firstName, lastName, email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim());
  const user = await db.user.create({
    data: { firstName, lastName, email: email.toLowerCase().trim(), hashedPassword },
    select: { id: true, firstName: true, lastName: true, email: true },
  });

  await ctx.session.$create({ userId: user.id });
  return user;
});
