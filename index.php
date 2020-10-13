<?php?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webflow Conversion</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous"></script>
</head>
<body>
  <div class="container mt-5">
    <h1 class="text-center">Webflow Conversion</h1>
    <form>
      <div class="form-group">
        <select id="type-select" class="custom-select">
          <option disabled >Selectionner le type du fichier</option>
          <option selected value="index">index</option>
          <option value="confirmation_num">confirmation_num</option>
          <option value="conftransition">conftransition</option>
          <option value="confirmation">confirmation</option>
          <option value="confirmation2">confirmation2</option>
        </select>
      </div>
      <div class="form-group">
        <select id="type-form-select" class="custom-select">
          <option disabled >Sélectionnez le type de formulaire.</option>
          <option selected value="One-Step">One-Step</option>
          <option value="Multi-Step">Multi-Step</option>
        </select>
      </div>
      <div class="form-group">
        <select id="type-client-select" class="custom-select">
          <option disabled >Sélectionnez le type de client.</option>
          <option selected value="Assuragency-Iframe">Assuragency-Iframe</option>
          <option value="Dedeco-CPF">Dedeco-CPF</option>
          <option value="MultiClient-Pinel">MultiClient-Pinel</option>
        </select>
      </div>
      <div class="form-group">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile">
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
      </div>
      <div class="form-group">
        <button type="button" id="validate-btn" class="btn btn-primary btn-lg btn-block">Transform</button>
      </div>
    </form>
  </div>
  <script src="./CURRENT.js"></script>
</body>

</html>
<script>
   
</script>


