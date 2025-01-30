Feature: Botón de búsqueda

  Como usuario del sistema bancario
  Quiero usar el botón de búsqueda para encontrar información relevante
  Para obtener resultados rápidamente según mis criterios

  Scenario: El botón de búsqueda es visible y clicable
    Given que estoy en la página principal "solverpay" y "r7auF23wA.A2l1tZ2Dp4"
    Then el botón de búsqueda debería estar visible
    And el botón de búsqueda debería ser clicable

  Scenario: Buscar un término inexistente
    Given que estoy en la página principal "solverpay" y "r7auF23wA.A2l1tZ2Dp4"
    When ingreso el término "inexistente" en el campo de búsqueda
    And presiono el botón búsqueda
    Then debería ver un mensaje indicando que no hay resultados

  Scenario: Realizar una búsqueda con resultados válidos
    Given que estoy en la página principal "solverpay" y "r7auF23wA.A2l1tZ2Dp4"
    When ingreso el término "transferencias" en el campo de búsqueda
    And presiono el botón de búsqueda
    Then deberían mostrarse los resultados relacionados con "transferencias"

  Scenario: Realizar una búsqueda sin resultados
    Given que estoy en la página principal "solverpay" y "r7auF23wA.A2l1tZ2Dp4"
    When ingreso "noexistente" en el campo de búsqueda
    And presiono el botón de búsqueda
    Then debería mostrarse un mensaje indicando "No se encontraron resultados"

  Scenario: Manejo de entradas inválidas
    Given que estoy en la página principal "solverpay" y "r7auF23wA.A2l1tZ2Dp4"
    When ingreso caracteres especiales "@#$%^" en el campo de búsqueda
    And presiono el botón de búsqueda
    Then debería mostrarse un mensaje indicando "Entrada no válida"
