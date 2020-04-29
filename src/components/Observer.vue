<template>
  <div class="observer"></div>
</template>

<script>
//emits event when becomes visible
//--> for paging while scrolling a table
export default {
  name: "observer",
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    });

    this.observer.observe(this.$el);
  }
};
</script>
