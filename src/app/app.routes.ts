import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "prefix" },
    { path: "home", loadComponent: () => import("./home/home.component").then(m => m.HomeComponent) },
    { path: "about", loadComponent: () => import("./about-me/about-me.component").then(m => m.AboutMeComponent) },
    { path: "skills", loadComponent: () => import("./my-skills/my-skills.component").then(m => m.MySkillsComponent) },
    { path: "projects", loadComponent: () => import("./projects/projects.component").then(m => m.ProjectsComponent) },
    { path: "contact-me", loadComponent: () => import("./contact-me/contact-me.component").then(m => m.ContactMeComponent) },
    { path: "blog", loadComponent: () => import("./blog/blog.component").then(m => m.BlogComponent) },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];
