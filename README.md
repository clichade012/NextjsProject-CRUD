# Step1 -- 
  npm i 

# use Postgres --
 1. Admin_login
CREATE TABLE IF NOT EXISTS public.admin_login
(
    id integer NOT NULL DEFAULT nextval('admin_login_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.admin_login
    OWNER to awspsql365;

2.list 
CREATE TABLE IF NOT EXISTS public.list
(
    list_id integer NOT NULL DEFAULT nextval('list_list_id_seq'::regclass),
    title character varying(150) COLLATE pg_catalog."default",
    description character varying(250) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.list
    OWNER to awspsql365;

# For CREATEING TODO used STORE PORECDURES (SP)


CREATE OR REPLACE PROCEDURE public."SP_Add_List"(
	IN title character varying,
	IN description character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN

  INSERT INTO public.list(
       title, description)
        VALUES (
		 title, description
	);
    

END;
$BODY$;

# For getting List made function

CREATE OR REPLACE FUNCTION public.fn_get_list(
	_id integer)
    RETURNS TABLE(list_id integer, title character varying, description character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    IF _id = 0 THEN
        RETURN QUERY SELECT 
           l.list_id, l.title, l.description 
        FROM list l;
    ELSE 
        RETURN QUERY SELECT 
             l.list_id,  l.title, l.description 
        FROM list l
        WHERE l.list_id = _id;
    END IF;
END
$BODY$;


# For updating Todo

CREATE OR REPLACE PROCEDURE public."SP_Update_List"(
	IN in_list_id integer,
	IN in_title character varying,
	IN in_description character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    UPDATE public.list l
    SET title = in_title, description = in_description
    WHERE l.list_id = in_list_id;

    -- You can add additional logic or return statements if needed.
END;
$BODY$;

# For Deleting Todo

CREATE OR REPLACE PROCEDURE public."SP_DELETE_ID"(
	IN _id integer)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM public.list
	WHERE list_id=_id;
    

END;
$BODY$;

