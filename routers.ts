import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
          email: z.string().email("Email inválido"),
          phone: z.string().min(9, "Telefone inválido"),
          service: z.string().min(1, "Selecione um serviço"),
          message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Notify owner about new contact form submission
          const title = `Novo Contato - ${input.name}`;
          const content = `
            <strong>Nome:</strong> ${input.name}<br>
            <strong>Email:</strong> ${input.email}<br>
            <strong>Telefone:</strong> ${input.phone}<br>
            <strong>Serviço:</strong> ${input.service}<br>
            <strong>Mensagem:</strong><br>
            ${input.message.replace(/\n/g, '<br>')}
          `;

          await notifyOwner({ title, content });

          return {
            success: true,
            message: "Formulário enviado com sucesso!",
          };
        } catch (error) {
          console.error("Error submitting contact form:", error);
          throw new Error("Erro ao enviar formulário. Tente novamente.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
