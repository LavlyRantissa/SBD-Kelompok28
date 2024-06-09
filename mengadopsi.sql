--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adoption; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.adoption (
    adopt_id integer NOT NULL,
    user_id integer NOT NULL,
    cat_id integer NOT NULL,
    adopt_date date NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(15) NOT NULL,
    pickup_or_delivery character varying(20) NOT NULL,
    delivery_address text,
    cat_name character varying(100) NOT NULL,
    cat_breed character varying(100) NOT NULL,
    cat_gender character varying(10) NOT NULL
);


ALTER TABLE public.adoption OWNER TO lavlyrantissa;

--
-- Name: adoption_adopt_id_seq; Type: SEQUENCE; Schema: public; Owner: lavlyrantissa
--

CREATE SEQUENCE public.adoption_adopt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.adoption_adopt_id_seq OWNER TO lavlyrantissa;

--
-- Name: adoption_adopt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lavlyrantissa
--

ALTER SEQUENCE public.adoption_adopt_id_seq OWNED BY public.adoption.adopt_id;


--
-- Name: adoption_table; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.adoption_table (
    adopt_id uuid DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    cat_id uuid NOT NULL,
    adopt_date date NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(12) NOT NULL,
    pickup_or_delivery character varying(20) NOT NULL,
    delivery_address text,
    cat_name character varying(100) NOT NULL,
    cat_breed character varying(100) NOT NULL,
    cat_gender character varying(10) NOT NULL,
    CONSTRAINT adoption_table_phone_number_check CHECK (((length((phone_number)::text) = 12) AND ((phone_number)::text ~ '^[0-9]+$'::text)))
);


ALTER TABLE public.adoption_table OWNER TO lavlyrantissa;

--
-- Name: cats; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.cats (
    cat_id integer NOT NULL,
    cat_name character varying(50) NOT NULL,
    cat_picture character varying(255),
    birthdate date,
    race character varying(50),
    gender character varying(10),
    description text,
    from_user integer
);


ALTER TABLE public.cats OWNER TO lavlyrantissa;

--
-- Name: cats_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: lavlyrantissa
--

CREATE SEQUENCE public.cats_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cats_cat_id_seq OWNER TO lavlyrantissa;

--
-- Name: cats_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lavlyrantissa
--

ALTER SEQUENCE public.cats_cat_id_seq OWNED BY public.cats.cat_id;


--
-- Name: cats_table; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.cats_table (
    cat_id uuid DEFAULT gen_random_uuid() NOT NULL,
    cat_name character varying(50) NOT NULL,
    cat_picture text,
    birthdate date,
    race character varying(50),
    gender character varying(10) NOT NULL,
    description text,
    from_user uuid,
    status character varying(10) DEFAULT 'AVAILABLE'::character varying
);


ALTER TABLE public.cats_table OWNER TO lavlyrantissa;

--
-- Name: donation; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.donation (
    donate_id integer NOT NULL,
    balance numeric(10,2) NOT NULL,
    donate_message text,
    user_id integer
);


ALTER TABLE public.donation OWNER TO lavlyrantissa;

--
-- Name: donation_donate_id_seq; Type: SEQUENCE; Schema: public; Owner: lavlyrantissa
--

CREATE SEQUENCE public.donation_donate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.donation_donate_id_seq OWNER TO lavlyrantissa;

--
-- Name: donation_donate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lavlyrantissa
--

ALTER SEQUENCE public.donation_donate_id_seq OWNED BY public.donation.donate_id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.post (
    post_id integer NOT NULL,
    cat_id integer NOT NULL,
    user_id integer NOT NULL,
    message text
);


ALTER TABLE public.post OWNER TO lavlyrantissa;

--
-- Name: post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: lavlyrantissa
--

CREATE SEQUENCE public.post_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_post_id_seq OWNER TO lavlyrantissa;

--
-- Name: post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lavlyrantissa
--

ALTER SEQUENCE public.post_post_id_seq OWNED BY public.post.post_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(15),
    balance numeric(10,2) DEFAULT 0.00,
    profile_picture character varying(255)
);


ALTER TABLE public.users OWNER TO lavlyrantissa;

--
-- Name: users_table; Type: TABLE; Schema: public; Owner: lavlyrantissa
--

CREATE TABLE public.users_table (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(20) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone_number character varying(12),
    balance numeric(10,2) DEFAULT 0.00,
    address text,
    profile_picture text,
    CONSTRAINT users_table_password_check CHECK ((length(password) >= 8)),
    CONSTRAINT users_table_phone_number_check CHECK (((length((phone_number)::text) = 12) AND ((phone_number)::text ~ '^[0-9]+$'::text))),
    CONSTRAINT users_table_username_check CHECK ((length((username)::text) >= 5))
);


ALTER TABLE public.users_table OWNER TO lavlyrantissa;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: lavlyrantissa
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO lavlyrantissa;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lavlyrantissa
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: adoption adopt_id; Type: DEFAULT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.adoption ALTER COLUMN adopt_id SET DEFAULT nextval('public.adoption_adopt_id_seq'::regclass);


--
-- Name: cats cat_id; Type: DEFAULT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.cats ALTER COLUMN cat_id SET DEFAULT nextval('public.cats_cat_id_seq'::regclass);


--
-- Name: donation donate_id; Type: DEFAULT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.donation ALTER COLUMN donate_id SET DEFAULT nextval('public.donation_donate_id_seq'::regclass);


--
-- Name: post post_id; Type: DEFAULT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.post ALTER COLUMN post_id SET DEFAULT nextval('public.post_post_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: adoption; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.adoption (adopt_id, user_id, cat_id, adopt_date, name, email, phone_number, pickup_or_delivery, delivery_address, cat_name, cat_breed, cat_gender) FROM stdin;
\.


--
-- Data for Name: adoption_table; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.adoption_table (adopt_id, user_id, cat_id, adopt_date, name, email, phone_number, pickup_or_delivery, delivery_address, cat_name, cat_breed, cat_gender) FROM stdin;
70836179-e93b-4832-a92e-c0e33b8b4884	2d62143b-b64a-46bc-9c19-936ce13f4a62	8448d005-3526-47fc-bf40-c63e98a6f77b	2024-12-12	Sasa	sasa@gmail.com	080834346767	DELIVERY	Jl. Satu	Momo	Persian	FEMALE
915e1973-ef82-45c1-bd18-926dd1820af5	2d62143b-b64a-46bc-9c19-936ce13f4a62	8448d005-3526-47fc-bf40-c63e98a6f77b	2024-12-12	Sasa	sasa@gmail.com	080834346767	PICK UP		Momo	Persian	FEMALE
a51b7e01-eeab-46f7-b977-48d509610757	2d62143b-b64a-46bc-9c19-936ce13f4a62	8448d005-3526-47fc-bf40-c63e98a6f77b	2024-10-09	Susi	susi@gmail.com	089877665567	PICK UP		Momo	Persian	FEMALE
331d12bc-898d-415b-8e84-73939b0fb8a1	957bc9d3-2a52-4c00-9922-b21dadc50193	8448d005-3526-47fc-bf40-c63e98a6f77b	2024-10-09	Susi	susi@gmail.com	089877665567	PICK UP		Momo	Persian	FEMALE
f6f7b7b1-9733-4665-98ee-fe52a4316830	2d62143b-b64a-46bc-9c19-936ce13f4a62	8448d005-3526-47fc-bf40-c63e98a6f77b	2024-06-09	Kumbang	kumbang@gmail.com	234565435627	undefined	Pluto	Momo	Persian	FEMALE
a2bb0725-6053-426a-aa93-6a51cf608f20	2d62143b-b64a-46bc-9c19-936ce13f4a62	5a39f383-bd19-4957-bb58-6ffcfdd4f9b3	2024-06-09	Nunung	nunung@gmail.com	123456789812	undefined		Lulu	American Short Hair	MALE
e3f04a8e-35fc-4d85-b391-f054b8673ba2	2d62143b-b64a-46bc-9c19-936ce13f4a62	5a39f383-bd19-4957-bb58-6ffcfdd4f9b3	2024-06-09	Nunung	nunung@gmail.com	081310998756	undefined		Lulu	American Short Hair	MALE
ee70aeb7-1004-4bf0-87bd-e3971c2b8a80	2d62143b-b64a-46bc-9c19-936ce13f4a62	5a39f383-bd19-4957-bb58-6ffcfdd4f9b3	2024-06-09	Kayakgitu	gitu@gmail.com	089877665567	undefined	Rumah gue	Lulu	American Short Hair	MALE
5236eb84-77ac-4525-9f7d-a39df0f412b0	2d62143b-b64a-46bc-9c19-936ce13f4a62	5a39f383-bd19-4957-bb58-6ffcfdd4f9b3	2024-06-09	Kayakgitu	gitu@gmail.com	123432434233	undefined	Sana	Lulu	American Short Hair	MALE
58eb9500-1986-4abc-bbe5-8f94ae9d54a5	2d62143b-b64a-46bc-9c19-936ce13f4a62	fb9f94ec-9113-4011-a23b-d50f54c3fe6f	2024-06-09	Saya	saya@gmail.com	666666666666	undefined		Nana	Spynx	MALE
c7027139-4971-4275-b5de-e047b996dc74	2d62143b-b64a-46bc-9c19-936ce13f4a62	fb9f94ec-9113-4011-a23b-d50f54c3fe6f	2023-12-12	KK	kk@gmail.com	111111111111	PICK UO		Nana	Spynx	MALE
4ee0e7e9-7487-402b-a69d-faa6123d1e7f	c89ce1dd-440c-4455-8f45-31ed43cff498	fb9f94ec-9113-4011-a23b-d50f54c3fe6f	2024-06-09	Kelompok 28	kitahebat@gmail.com	131313131313	undefined	Jl. UI	Nana	Spynx	MALE
\.


--
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.cats (cat_id, cat_name, cat_picture, birthdate, race, gender, description, from_user) FROM stdin;
1	baldman	null	2024-02-16	domestic	male	like to eat your brain	\N
2	hairyman	null	2024-02-16	peaknose	male	like to eat your brain	\N
3	sasuke		1990-01-20	BSH	male	suka maling pangsit	\N
4	sasuke	null	2000-03-13	jenglot	male	jagoan kampung	\N
7	surya's cat	\N	2024-06-03	hitam	male	hitam	\N
8	surya's second cat		2024-06-19	hitam	female	hitam	\N
9	surya's second cat		2024-06-19	hitam	female	hitam	\N
10	surya's forth cat	\N	2024-06-10	hitam	female	hitam	\N
11	surya's forth cat	\N	2024-06-10	hitam	female	hitam	\N
12	surya's forth cat	\N	2024-06-10	hitam	female	hitam	\N
13	surya's forth cat	https://res.cloudinary.com/dramhnsj2/image/upload/v1717952293/cats_picture/mrjnmqfim1dztblj0lfv.png	2024-06-10	hitam	female	hitam	\N
\.


--
-- Data for Name: cats_table; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.cats_table (cat_id, cat_name, cat_picture, birthdate, race, gender, description, from_user, status) FROM stdin;
41372511-6c9d-4b39-baf7-f0a83562ed2c	Coco	\N	2021-10-01	British Short Hair	MALE	Kucing bloon	\N	\N
8448d005-3526-47fc-bf40-c63e98a6f77b	Momo	\N	2020-12-10	Persian	FEMALE	Test	\N	ADOPTED
5a39f383-bd19-4957-bb58-6ffcfdd4f9b3	Lulu	\N	2023-11-01	American Short Hair	MALE	Kucing bloon juga	\N	ADOPTED
76205720-3970-4b74-b495-ba55b109cdca	Nini	\N	2024-01-01	Spynx	MALE	Kucing botak	\N	AVAILABLE
fb9f94ec-9113-4011-a23b-d50f54c3fe6f	Nana	\N	2024-01-01	Spynx	MALE	Kucing botak	\N	ADOPTED
\.


--
-- Data for Name: donation; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.donation (donate_id, balance, donate_message, user_id) FROM stdin;
1	500000.00	stay healthy	\N
5	10000000.00	biar kenyang	\N
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.post (post_id, cat_id, user_id, message) FROM stdin;
1	2	2	lucyu syekali emuachhhh
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.users (user_id, username, password, email, phone_number, balance, profile_picture) FROM stdin;
2	pinkman	pinkman123	pinkman@gmail.com	023923239	0.00	\N
10	nakiw	naki123	naki@gmail.com	12394837	3000.00	\N
15	Budi	test1234	budi@gmail.com	\N	0.00	\N
\.


--
-- Data for Name: users_table; Type: TABLE DATA; Schema: public; Owner: lavlyrantissa
--

COPY public.users_table (user_id, username, email, password, phone_number, balance, address, profile_picture) FROM stdin;
6c0d7a5d-f650-498e-8bdc-23b7f7e6eb31	pinkman	pinkman@gmail.com	pinkman123	\N	0.00	\N	\N
89283d90-cc04-4646-85c6-9beab9e8a2c7	Patrick	Patrick@gmail.com	12345678	\N	0.00	\N	\N
2d62143b-b64a-46bc-9c19-936ce13f4a62	Budi Tabuti	Budi@gmail.com	akumaukedufan	081312887634	700.00	Jl. abc	https://res.cloudinary.com/dramhnsj2/image/upload/v1717929600/profile_picture_user/jziwv7jcszpwssjsh7gx.jpg
c89ce1dd-440c-4455-8f45-31ed43cff498	Kelompok 28	Kelompok28@gmail.com	kelompok28	882233445566	2000.00	Jl. Kemarau	https://res.cloudinary.com/dramhnsj2/image/upload/v1717950152/profile_picture_user/a3y7wdktkvq8w598z0xx.jpg
e56a2bdb-e14e-4d4e-a94b-863c5508498c	KuraKillu	surya@gmail.com	mengadopsi	\N	0.00	\N	https://res.cloudinary.com/dramhnsj2/image/upload/v1717951082/profile_picture_user/bt7q4dlmdsbgtvok3zj0.jpg
957bc9d3-2a52-4c00-9922-b21dadc50193	Spongebob	spongebob@gmail.com	krabbypatty	101010101010	10000.00	\N	https://res.cloudinary.com/dramhnsj2/image/upload/v1717951506/profile_picture_user/h93gi8xgkftzq7mhlxae.jpg
\.


--
-- Name: adoption_adopt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lavlyrantissa
--

SELECT pg_catalog.setval('public.adoption_adopt_id_seq', 1, false);


--
-- Name: cats_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lavlyrantissa
--

SELECT pg_catalog.setval('public.cats_cat_id_seq', 13, true);


--
-- Name: donation_donate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lavlyrantissa
--

SELECT pg_catalog.setval('public.donation_donate_id_seq', 5, true);


--
-- Name: post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lavlyrantissa
--

SELECT pg_catalog.setval('public.post_post_id_seq', 4, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lavlyrantissa
--

SELECT pg_catalog.setval('public.users_user_id_seq', 15, true);


--
-- Name: adoption adoption_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.adoption
    ADD CONSTRAINT adoption_pkey PRIMARY KEY (adopt_id);


--
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (cat_id);


--
-- Name: cats_table cats_table_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.cats_table
    ADD CONSTRAINT cats_table_pkey PRIMARY KEY (cat_id);


--
-- Name: donation donation_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.donation
    ADD CONSTRAINT donation_pkey PRIMARY KEY (donate_id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users_table users_table_email_key; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_table_email_key UNIQUE (email);


--
-- Name: users_table users_table_pkey; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_table_pkey PRIMARY KEY (user_id);


--
-- Name: users_table users_table_username_key; Type: CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_table_username_key UNIQUE (username);


--
-- Name: adoption_table adoption_table_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.adoption_table
    ADD CONSTRAINT adoption_table_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.cats_table(cat_id);


--
-- Name: adoption_table adoption_table_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.adoption_table
    ADD CONSTRAINT adoption_table_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users_table(user_id);


--
-- Name: cats cats_from_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_from_user_fkey FOREIGN KEY (from_user) REFERENCES public.users(user_id);


--
-- Name: cats_table cats_table_from_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.cats_table
    ADD CONSTRAINT cats_table_from_user_fkey FOREIGN KEY (from_user) REFERENCES public.users_table(user_id);


--
-- Name: donation donation_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.donation
    ADD CONSTRAINT donation_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: post post_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.cats(cat_id);


--
-- Name: post post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lavlyrantissa
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

