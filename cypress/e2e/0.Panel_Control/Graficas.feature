Feature: Visualización de gráficos

  Como usuario del sistema bancario
  Quiero visualizar gráficos en tiempo real
  Para comprender el estado actual de los datos financieros

  Scenario: Visualización del gráfico de ventas últimas horas
    Given que estoy en la página principal
    Then el gráfico "Ventas últimas horas" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de denegadas última hora
    Given que estoy en la página principal
    Then el gráfico "Denegadas última hora" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de diferidos última hora
    Given que estoy en la página principal
    Then el gráfico "Diferidos última hora" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de estado del offline forzado
    Given que estoy en la página principal
    Then el gráfico "Estado del offline forzado" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de estado del backup forzado
    Given que estoy en la página principal
    Then el gráfico "Estado del backup forzado" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de estado de las comisiones
    Given que estoy en la página principal
    Then el gráfico "Estado de las comisiones" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de transacciones por tipo
    Given que estoy en la página principal
    Then el gráfico "Transacciones por tipo" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de transacciones por entidad
    Given que estoy en la página principal
    Then el gráfico "Transacciones por entidad" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de transacciones por fechas diario
    Given que estoy en la página principal
    Then el gráfico "Transacciones por fechas diario" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de transacciones por fechas mensual
    Given que estoy en la página principal
    Then el gráfico "Transacciones por fechas mensual" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de importe por fechas diario
    Given que estoy en la página principal
    Then el gráfico "Importe por fechas diario" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado

  Scenario: Visualización del gráfico de importe por fechas mensual
    Given que estoy en la página principal
    Then el gráfico "Importe por fechas mensual" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
