import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "prefix" },
    { path: "home", loadComponent: () => import("./home/home.component").then(m => m.HomeComponent) },
    { path: "skills", loadComponent: () => import("./my-skills/my-skills.component").then(m => m.MySkillsComponent) },
    { path: "projects", loadComponent: () => import("./projects/projects.component").then(m => m.ProjectsComponent) },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];
