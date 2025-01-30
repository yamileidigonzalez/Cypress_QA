Feature: Gestión de Usuario

  Como usuario del sistema
  Quiero gestionar mi perfil y preferencias
  Para personalizar mi experiencia en el sistema

  Scenario: Cambiar la contraseña del usuario
    Given que accedo a la sección de perfil del usuario
    When cambio mi contraseña
    Then la contraseña debe actualizarse correctamente y recibo una confirmación de éxito

  Scenario: Cambiar el idioma de las preferencias
    Given que accedo a la sección de preferencias del usuario
    When cambio el idioma a otro disponible
    Then el idioma debe actualizarse correctamente en toda la interfaz
