import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Resource from "./views/Resource.vue";
import Document from "./views/Document.vue";
import VueRouter from "vue-router";

Vue.use(Router);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/resource",
      component: Resource,
      name: "resource",
      props: true
    },
    {
      path: "/document",
      component: Document,
      name: "document",
      props: {
        folderId: Number
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
