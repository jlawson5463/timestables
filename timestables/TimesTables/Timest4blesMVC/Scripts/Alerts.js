function ShowAdditionalTimeAlert() {
    swal({
        title: "Timeout!",
        text: "What would you like to do?",
        showCancelButton: true,
        cancelButtonText: "Reveal answer",
        type: "warning",
        confirmButtonText: "More time please"
    },
        function (isConfirm) {
            if (isConfirm) {
                timer = setTimeout(ShowAdditionalTimeAlert, 30000);
                ++moreTimeSelected;
            }
            else {
                RevealAnswer();
                ++revealedAnswer;
            }
        });
}