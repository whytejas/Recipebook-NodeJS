$(document).ready(function(){
    $('.edit-recipe').on('click', function(){
        $('#edit-form-id').val($(this).data('id'));
        $('#edit-form-name').val($(this).data('name'));
        $('#edit-form-ingredients').val($(this).data('ingredients'));
        $('#edit-form-directions').val($(this).data('direction'));
    })
})