Feature: Cerrar Sesión

  Como usuario del sistema
  Quiero cerrar sesión de manera segura
  Para asegurar que mi cuenta esté protegida

  Scenario: Cerrar sesión del usuario
    Given que estoy autenticado en el sistema
    When hago clic en el botón de cerrar sesión
    Then debo ser redirigido a la página de inicio de sesión
    And mi sesión debe cerrarse correctamente
