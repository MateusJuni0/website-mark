import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

describe("contact.submit", () => {
  it("should validate required fields", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    // Test missing name
    try {
      await caller.contact.submit({
        name: "",
        email: "test@example.com",
        phone: "+351 961 227 666",
        service: "website",
        message: "Test message content",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Nome");
    }
  });

  it("should validate email format", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contact.submit({
        name: "João Silva",
        email: "invalid-email",
        phone: "+351 961 227 666",
        service: "website",
        message: "Test message content",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Email");
    }
  });

  it("should validate phone format", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contact.submit({
        name: "João Silva",
        email: "test@example.com",
        phone: "123",
        service: "website",
        message: "Test message content",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Telefone");
    }
  });

  it("should validate service selection", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contact.submit({
        name: "João Silva",
        email: "test@example.com",
        phone: "+351 961 227 666",
        service: "",
        message: "Test message content",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("serviço");
    }
  });

  it("should validate message length", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contact.submit({
        name: "João Silva",
        email: "test@example.com",
        phone: "+351 961 227 666",
        service: "website",
        message: "Short",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Mensagem");
    }
  });

  it("should successfully submit valid contact form", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.contact.submit({
      name: "João Silva",
      email: "joao@example.com",
      phone: "+351 961 227 666",
      service: "website",
      message: "I would like to discuss a website project for my business.",
    });

    expect(result).toEqual({
      success: true,
      message: "Formulário enviado com sucesso!",
    });
  });

  it("should accept valid phone formats", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const validPhones = [
      "+351 961 227 666",
      "+351961227666",
      "961227666",
      "(+351) 961-227-666",
    ];

    for (const phone of validPhones) {
      const result = await caller.contact.submit({
        name: "João Silva",
        email: "joao@example.com",
        phone: phone,
        service: "website",
        message: "I would like to discuss a website project for my business.",
      });

      expect(result.success).toBe(true);
    }
  });

  it("should accept all service types", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const services = ["design", "website", "app", "ecommerce", "automation", "other"];

    for (const service of services) {
      const result = await caller.contact.submit({
        name: "João Silva",
        email: "joao@example.com",
        phone: "+351 961 227 666",
        service: service,
        message: "I would like to discuss a website project for my business.",
      });

      expect(result.success).toBe(true);
    }
  });
});
