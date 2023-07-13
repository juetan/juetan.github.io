import "vitepress";

declare module "vitepress" {
  interface DefaultTheme {
    NavItem: {
      icon?: string;
    };
  }
}
