(function (root) {

  var PT = root.PT = (root.PT || {})

  var TagSelectView = PT.TagSelectView = function (photo, event){
    this.$el = $("<div></div>");
    this.photo = photo;

    var position = $(event.currentTarget).position();
    this.tagPosition = {
      x: event.offsetX - 50,
      y: event.offsetY - 50
    };

    this.$el.css({
      "position": "absolute",
      "left": this.tagPosition.x + position.left,
      "top": this.tagPosition.y + position.top
    });

    this.$el.on("click", "ul.tag-options li", this.selectTagOption.bind(this));
  }

  _.extend(TagSelectView.prototype, {
    render: function () {
      this.$el.empty();

      var $tagBox = $("<div></div>");
      $tagBox.addClass("photo-tag");
      this.$el.append($tagBox);

      this.$el.append(JST["photo_tag_options"]( { users: USERS }));

      return this;
    },

    selectTagOption: function (event) {
      var userId = $(event.currentTarget).attr("data-id");
      new PT.PhotoTagging({
        photo_id: this.photo.get("id"),
        user_id: userId,
        x_pos: this.tagPosition.x,
        y_pos: this.tagPosition.y
      }).create();

      this.$el.remove();
    }
  })
})(this);