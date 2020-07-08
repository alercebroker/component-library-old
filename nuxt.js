this.nuxt.hook("components:dirs", (dirs) => {
    // Add ./components dir to the list
    dirs.push({
        path: join(__dirname, "components"),
        prefix: "alerce",
    });
});