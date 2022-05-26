          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.descripcion_fre,  t3.razonsocial_int, t4.descripcion_mar,
                                     t5.descripcion_grp,  t5.codigogrupo_grp,  t6.nombre_est, t7.nombre_estcli, t8.nombre_estmtto,
                                     t9.codigo_sgre,      t9.descripcion_sgre, t5.id_grp, t9.id_sgre, t10.nombre_estcal, t11.*,
                                     t14.*,
                                     vista_activos.valoradquisicion_act,	vista_activos.ctacontable_act,	vista_activos.ctadepreciacion_act,
                                     vista_activos.valorresidual_act, vista_activos.costosiniva_act,	vista_activos.depreciacionacumulada_act,
                                     vista_activos.valorneto_act,	vista_activos.valornovedad_act, vista_activos.nombre_est as estadodepreciacion,
	                                   vista_activos.depreciacionmensual_act,	vista_activos.valorenlibros_act, vista_activos.numerocombo_act,
                                     vista_activos.fechainiciadepre_act, vista_activos.fechaultimadepre_act,  
                                     seguros.numeroseguro_seg, seguros.estado_seg, seguros.valorcomercial_seg, t13.codigo_cco, t13.descripcion_cco,
                                     seguros.nombreestado_seg, seguros.declaracionimportacion_seg, '' as blanco,
                                     vista_ubicaciones.direccion_ubi, vista_ubicaciones.nit_cli, vista_ubicaciones.nombre_est as estadoubicacion,
                                     vista_ubicaciones.razonsocial_cli,
                                     vista_contratos.nombre_ciu, vista_contratos.nombre_dep, vista_contratos.nombre_dep as estadocontrato,
                                     vista_contratos.valorrentames_ctr, vista_contratos.duracion_ctr, vista_contratos.fechainicio_ctr,
                                     vista_contratos.fechafinal_ctr, vista_contratos.fechaalza_ctr, vista_contratos.diafacturacion_ctr,
                                     vista_contratos.asesorcomercial, vista_contratos.horastrabajocontratadas_ctr
          FROM equipos as t0 INNER JOIN empresa        as t1  INNER JOIN frecuencias           as t2 INNER JOIN interlocutores as t3
                             INNER JOIN marcas         as t4  INNER JOIN gruposequipos         as t5 INNER JOIN estados        as t6
                             INNER JOIN estadoscliente as t7  INNER JOIN estadosmtto           as t8 INNER JOIN subgrupopartes as t9
                             INNER JOIN estadoscalidad as t10 INNER JOIN datosadicionalequipos as t11 
                             INNER JOIN centrodecosto  as t13 INNER JOIN componentesxequipo    as t14
                             left join seguros on (seguros.equipo_seg = t0.id_equ)
                             vista_ubicaciones.equipo_ubi
                             left join vista_contratos   on (vista_contratos.id_ctr       = t0.id_equ)
                             left join vista_activos     on (vista_activos.codigo_act     = t0.id_equ)
          WHERE t0.empresa_equ         = t1.id_emp     and t0.frecuencia_equ    = t2.id_fre    and t0.propietario_equ   = t3.id_int     and
                t0.marca_equ           = t4.id_mar     and t0.grupoequipo_equ   = t5.id_grp    and t0.subgrupoparte_equ = t9.id_sgre    and
                t0.estadocontable_equ  = t6.id_est     and t0.estadocliente_equ = t7.id_estcli and t0.estadomtto_equ    = t8.id_estmtto and
                t0.estadocalidad_equ   = t10.id_estcal and t0.id_equ            = t11.id_dequ  and t11.centrodecosto_dequ = t13.id_cco  and
                t0.id_equ              = t14.equipo_com");