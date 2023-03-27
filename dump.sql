--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    comment text NOT NULL,
    created_at timestamp without time zone DEFAULT '2023-03-23 13:27:55.342896'::timestamp without time zone NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    followed_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2023-03-23 13:27:55.342896'::timestamp without time zone NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    post_id integer NOT NULL,
    name character varying(30) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: info_link_post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.info_link_post (
    id integer NOT NULL,
    post_id integer NOT NULL,
    title_link text,
    description_link text,
    image_link text
);


--
-- Name: info_link_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.info_link_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: info_link_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.info_link_post_id_seq OWNED BY public.info_link_post.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    link text NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shares (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2023-03-23 13:27:55.342896'::timestamp without time zone NOT NULL
);


--
-- Name: shares_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shares_id_seq OWNED BY public.shares.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    avatar_url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: info_link_post id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.info_link_post ALTER COLUMN id SET DEFAULT nextval('public.info_link_post_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shares id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares ALTER COLUMN id SET DEFAULT nextval('public.shares_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 1, 2, 'qweqweeeeeeeeeeeeeeeeeeeeeeeeeeeq qweqweqwe', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (2, 1, 16, 'asdasd', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (3, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (4, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (5, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (6, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (7, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (8, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (9, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (10, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (11, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (12, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (13, 1, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (14, 2, 2, 'laksdlakdlaksdl', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (15, 1, 16, 'asdasdad', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (16, 1, 16, 'qweqweasdacqeq', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (17, 1, 16, 'asdasdas', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (18, 1, 16, 'caccccccccccccc', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (19, 1, 15, 'asdadasd', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (20, 4, 16, 'asdasdas', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (21, 4, 13, 'asdasdas', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (22, 1, 16, 'asdasd', '2023-03-23 13:27:55.342896');
INSERT INTO public.comments VALUES (23, 1, 16, 'asdasd', '2023-03-23 13:27:55.342896');


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.followers VALUES (3, 3, 2, '2023-03-23 13:27:55.342896');
INSERT INTO public.followers VALUES (8, 2, 1, '2023-03-23 13:27:55.342896');
INSERT INTO public.followers VALUES (9, 3, 1, '2023-03-23 13:27:55.342896');
INSERT INTO public.followers VALUES (10, 1, 3, '2023-03-23 13:27:55.342896');
INSERT INTO public.followers VALUES (11, 1, 4, '2023-03-23 13:27:55.342896');


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (2, 6, '#qeqeq', '2023-03-10 17:47:07.10968');
INSERT INTO public.hashtags VALUES (3, 6, '#eqweas', '2023-03-10 17:47:07.10968');
INSERT INTO public.hashtags VALUES (4, 7, '#qeqeq', '2023-03-10 17:48:00.193396');
INSERT INTO public.hashtags VALUES (5, 7, '#eqweas', '2023-03-10 17:48:00.193396');
INSERT INTO public.hashtags VALUES (6, 7, '#qweqeqwe', '2023-03-10 17:48:00.193396');
INSERT INTO public.hashtags VALUES (7, 8, '#qweqe', '2023-03-10 17:55:32.813763');
INSERT INTO public.hashtags VALUES (8, 8, '#qeasdc', '2023-03-10 17:55:32.813763');
INSERT INTO public.hashtags VALUES (9, 9, '#qweqe', '2023-03-10 17:56:28.197303');
INSERT INTO public.hashtags VALUES (10, 9, '#qeasdc', '2023-03-10 17:56:28.197303');
INSERT INTO public.hashtags VALUES (11, 10, '#qweqe', '2023-03-10 17:57:36.664971');
INSERT INTO public.hashtags VALUES (12, 10, '#qeasdc', '2023-03-10 17:57:36.664971');
INSERT INTO public.hashtags VALUES (13, 11, '#top1', '2023-03-10 19:43:41.425401');
INSERT INTO public.hashtags VALUES (14, 12, '#top1', '2023-03-10 19:43:47.301235');
INSERT INTO public.hashtags VALUES (15, 13, '#top1', '2023-03-10 19:44:04.262431');
INSERT INTO public.hashtags VALUES (16, 14, '#top1', '2023-03-10 19:44:09.158243');
INSERT INTO public.hashtags VALUES (17, 17, '#qweqwe', '2023-03-24 17:54:25.865505');


--
-- Data for Name: info_link_post; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.info_link_post VALUES (1, 18, NULL, NULL, NULL);
INSERT INTO public.info_link_post VALUES (2, 19, NULL, NULL, NULL);
INSERT INTO public.info_link_post VALUES (3, 20, 'Feat/user feed by apocsenpai · Pull Request #12 · Mateuscruz19/projeto18-linkr-frontend', 'Contribute to Mateuscruz19/projeto18-linkr-frontend development by creating an account on GitHub.', 'https://opengraph.githubassets.com/70d20cdc794d9122e7a1d1da216302b64c6c46aed269a23cd9e8ef9aafd73004/Mateuscruz19/projeto18-linkr-frontend/pull/12');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (6, 14, 1, '2023-03-22 17:00:41.78758');
INSERT INTO public.likes VALUES (7, 14, 4, '2023-03-22 17:07:50.616292');
INSERT INTO public.likes VALUES (8, 16, 4, '2023-03-22 17:07:53.055888');
INSERT INTO public.likes VALUES (10, 11, 1, '2023-03-23 20:50:35.316853');
INSERT INTO public.likes VALUES (26, 16, 1, '2023-03-26 23:42:30.532314');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (2, 1, 'www.google.com', 'muito maneiro asdasd', '2023-03-09 16:29:55.744118', '2023-03-09 16:29:55.744118');
INSERT INTO public.posts VALUES (4, 1, 'https://www.google.com/search?channel=fs&client=ubuntu&q=aqwe', 'qeqweqwe #qeqeq #eqweas', '2023-03-10 17:46:18.554234', '2023-03-10 17:46:18.554234');
INSERT INTO public.posts VALUES (5, 1, 'https://www.google.com/search?channel=fs&client=ubuntu&q=aqwe', 'qeqweqwe #qeqeq #eqweas', '2023-03-10 17:46:40.379101', '2023-03-10 17:46:40.379101');
INSERT INTO public.posts VALUES (6, 1, 'https://www.google.com/search?channel=fs&client=ubuntu&q=aqwe', 'qeqweqwe #qeqeq #eqweas', '2023-03-10 17:47:07.097225', '2023-03-10 17:47:07.097225');
INSERT INTO public.posts VALUES (7, 1, 'https://www.google.com/search?channel=fs&client=ubuntu&q=aqwe', 'qeqweqwe #qeqeq #eqweas #qweqeqwe', '2023-03-10 17:48:00.180371', '2023-03-10 17:48:00.180371');
INSERT INTO public.posts VALUES (8, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', 'qweqeq #qweqe qweqwe #qeasdc', '2023-03-10 17:55:32.770432', '2023-03-10 17:55:32.770432');
INSERT INTO public.posts VALUES (9, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', '1212121212 #qweqe qweqwe #qeasdc', '2023-03-10 17:56:28.173363', '2023-03-10 17:56:28.173363');
INSERT INTO public.posts VALUES (10, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', 'qweqeq #qweqe qweqwe #qeasdc', '2023-03-10 17:57:36.635184', '2023-03-10 17:57:36.635184');
INSERT INTO public.posts VALUES (11, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', '#top1 qweqwe', '2023-03-10 19:43:41.392172', '2023-03-10 19:43:41.392172');
INSERT INTO public.posts VALUES (12, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', '#top1 qweqwe', '2023-03-10 19:43:47.273549', '2023-03-10 19:43:47.273549');
INSERT INTO public.posts VALUES (13, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', '#top1 qweqwe', '2023-03-10 19:44:04.225829', '2023-03-10 19:44:04.225829');
INSERT INTO public.posts VALUES (14, 1, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', '#top1 qweqwe', '2023-03-10 19:44:09.12368', '2023-03-10 19:44:09.12368');
INSERT INTO public.posts VALUES (15, 1, 'https://static-cse.canva.com/blob/759727/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.0f6858b2.jpg', 'qweqe', '2023-03-22 17:03:06.389267', '2023-03-22 17:03:06.389267');
INSERT INTO public.posts VALUES (16, 4, 'https://www.figma.com/file/IsxlMkRqXlEFSnGwZU1Fxm/T6-%7C-Projet%C3%A3o%3A-Linkr---Rede-Social-de-Links-(Sprint-2)?node-id=0%3A1&t=OtB0421QZiCnKzdS-0', 'asdasdasd', '2023-03-22 17:07:41.472981', '2023-03-22 17:07:41.472981');
INSERT INTO public.posts VALUES (17, 1, 'https://static-cse.canva.com/blob/759727/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.0f6858b2.jpg', 'qweqeqwe #qweqwe qweqwe', '2023-03-24 17:54:25.81339', '2023-03-24 17:54:25.81339');
INSERT INTO public.posts VALUES (18, 1, 'https://static-cse.canva.com/blob/759727/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.0f6858b2.jpg', 'rewrwerwerewr', '2023-03-26 23:25:32.296603', '2023-03-26 23:25:32.296603');
INSERT INTO public.posts VALUES (19, 1, 'https://static-cse.canva.com/blob/759727/ComoTirareEditarSuaFotoparaPerfilemRedesSociaisfeaturedimagee1559023010630.0f6858b2.jpg', 'ewrwerewr', '2023-03-26 23:25:58.871872', '2023-03-26 23:25:58.871872');
INSERT INTO public.posts VALUES (20, 1, 'https://github.com/Mateuscruz19/projeto18-linkr-frontend/pull/12', 'ewrwerwer', '2023-03-26 23:26:27.922112', '2023-03-26 23:26:27.922112');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'dc40b4de-2701-406a-a730-caef552ca322', '2023-03-07 22:53:34.925922', '2023-03-07 22:53:34.925922', '2023-03-07 22:53:34.854');
INSERT INTO public.sessions VALUES (2, 1, '30939fc7-99bc-45c6-a3c0-72575abebb2f', '2023-03-09 09:18:37.330578', '2023-03-09 09:18:37.330578', '2023-03-09 09:18:37.257');
INSERT INTO public.sessions VALUES (3, 1, 'ee781331-59bc-44f9-b498-3e43367e9884', '2023-03-09 09:19:45.576787', '2023-03-09 09:19:45.576787', '2023-03-09 09:19:45.512');
INSERT INTO public.sessions VALUES (4, 1, '3bdb032a-bc31-4cee-80cc-84d2464e8671', '2023-03-09 10:19:37.209921', '2023-03-09 10:19:37.209921', '2023-03-09 10:19:37.139');
INSERT INTO public.sessions VALUES (5, 1, '92483943-5fc1-451e-85fb-fef9fb854ba4', '2023-03-09 11:11:15.231092', '2023-03-09 11:11:15.231092', '2023-03-09 11:11:15.162');
INSERT INTO public.sessions VALUES (6, 1, 'bf631047-52b5-4dfc-9768-be97a40d696a', '2023-03-09 11:11:31.740875', '2023-03-09 11:11:31.740875', '2023-03-09 11:11:31.674');
INSERT INTO public.sessions VALUES (7, 1, '6332b545-36ec-4853-bb6c-24ce0dba037a', '2023-03-09 11:12:00.693282', '2023-03-09 11:12:00.693282', '2023-03-09 11:12:00.627');
INSERT INTO public.sessions VALUES (8, 1, '9f3968ea-6ff6-418f-b9b6-6f120bba7e65', '2023-03-09 11:12:23.381752', '2023-03-09 11:12:23.381752', '2023-03-09 11:12:23.316');
INSERT INTO public.sessions VALUES (9, 1, '0ad555a7-5228-45a3-890b-f7c11886f5fd', '2023-03-09 11:12:44.036575', '2023-03-09 11:12:44.036575', '2023-03-09 11:12:43.972');
INSERT INTO public.sessions VALUES (10, 1, '5a0dd582-2729-4e87-908b-fc9dd326a6c6', '2023-03-09 11:12:54.048472', '2023-03-09 11:12:54.048472', '2023-03-09 11:12:53.988');
INSERT INTO public.sessions VALUES (11, 1, '764af048-3117-4349-951d-03fc72b531ab', '2023-03-09 11:25:43.971456', '2023-03-09 11:25:43.971456', '2023-03-09 11:25:43.901');
INSERT INTO public.sessions VALUES (12, 1, '510cb02c-416f-45a2-aad2-385b5c090120', '2023-03-09 11:25:49.949963', '2023-03-09 11:25:49.949963', '2023-03-09 11:25:49.889');
INSERT INTO public.sessions VALUES (13, 1, '607fd9d5-92d6-420d-845d-f58491f316b8', '2023-03-09 11:40:39.914788', '2023-03-09 11:40:39.914788', '2023-03-09 11:40:39.856');
INSERT INTO public.sessions VALUES (14, 1, 'c6fb653d-7909-43a5-8b2e-86ca4c5adfa4', '2023-03-09 11:40:48.179058', '2023-03-09 11:40:48.179058', '2023-03-09 11:40:48.117');
INSERT INTO public.sessions VALUES (15, 1, 'bc374bb5-489d-4da9-9e31-4c174d12ca6d', '2023-03-09 11:44:44.038092', '2023-03-09 11:44:44.038092', '2023-03-09 11:44:43.966');
INSERT INTO public.sessions VALUES (16, 1, '222e025f-cc7a-44f7-9695-cf43f2df56b1', '2023-03-09 11:44:57.594561', '2023-03-09 11:44:57.594561', '2023-03-09 11:44:57.529');
INSERT INTO public.sessions VALUES (17, 1, 'd994a849-1e4c-44f8-9d8b-93bcd4b6c1e6', '2023-03-09 11:45:19.65249', '2023-03-09 11:45:19.65249', '2023-03-09 11:45:19.592');
INSERT INTO public.sessions VALUES (18, 1, 'cabd578d-0c5b-4c58-a89d-bcd5d7765851', '2023-03-09 11:46:27.77502', '2023-03-09 11:46:27.77502', '2023-03-09 11:46:27.703');
INSERT INTO public.sessions VALUES (19, 1, '67d619d0-70c4-4632-83a5-49d6b79d9f7c', '2023-03-09 11:48:29.830452', '2023-03-09 11:48:29.830452', '2023-03-09 11:48:29.769');
INSERT INTO public.sessions VALUES (20, 1, '3ea42e03-397f-4dc9-9c86-8f7f159a0f7e', '2023-03-09 12:21:17.287019', '2023-03-09 12:21:17.287019', '2023-03-09 12:21:17.22');
INSERT INTO public.sessions VALUES (21, 1, '2d717449-4f73-4a39-847a-2517920b5cdb', '2023-03-09 13:12:10.558941', '2023-03-09 13:12:10.558941', '2023-03-09 13:12:10.497');
INSERT INTO public.sessions VALUES (22, 1, 'e920469b-08aa-4ec6-b33e-66559377f4c3', '2023-03-09 13:23:14.301302', '2023-03-09 13:23:14.301302', '2023-03-09 13:23:14.231');
INSERT INTO public.sessions VALUES (23, 1, '83ec7168-5309-4449-9e21-29b9f6faa949', '2023-03-09 13:32:54.280019', '2023-03-09 13:32:54.280019', '2023-03-09 13:32:54.219');
INSERT INTO public.sessions VALUES (24, 1, '5aed626e-8646-4679-be3f-43545dc34e39', '2023-03-09 13:44:29.378641', '2023-03-09 13:44:29.378641', '2023-03-09 13:44:29.308');
INSERT INTO public.sessions VALUES (25, 1, '996c9e9b-ba1c-4a84-b853-c739d6d2ee8b', '2023-03-09 13:45:11.874982', '2023-03-09 13:45:11.874982', '2023-03-09 13:45:11.812');
INSERT INTO public.sessions VALUES (26, 1, 'e2f9a5c8-a2af-45a3-a805-c847833b0b2c', '2023-03-09 13:46:01.239348', '2023-03-09 13:46:01.239348', '2023-03-09 13:46:01.158');
INSERT INTO public.sessions VALUES (27, 1, '826e9be7-dffc-423c-aa9e-4a4390cff68f', '2023-03-09 13:59:06.439771', '2023-03-09 13:59:06.439771', '2023-03-09 13:59:06.38');
INSERT INTO public.sessions VALUES (28, 1, 'bdd14151-7e01-432a-952a-b4dba9961be4', '2023-03-09 13:59:40.745088', '2023-03-09 13:59:40.745088', '2023-03-09 13:59:40.679');
INSERT INTO public.sessions VALUES (29, 1, '6acdd0c3-7471-4abc-a2be-70b95468e112', '2023-03-09 16:02:44.961077', '2023-03-09 16:02:44.961077', '2023-03-09 16:02:44.882');
INSERT INTO public.sessions VALUES (30, 1, '21f828fb-d91e-43c9-a14f-67b6d0928445', '2023-03-09 16:03:18.49345', '2023-03-09 16:03:18.49345', '2023-03-09 16:03:18.425');
INSERT INTO public.sessions VALUES (31, 1, 'defcf258-983e-41c6-aaeb-60c420e0ad4e', '2023-03-09 16:04:16.185343', '2023-03-09 16:04:16.185343', '2023-03-09 16:04:16.114');
INSERT INTO public.sessions VALUES (32, 1, '459ce7ae-518a-405f-82c1-23ed9eb9b7ba', '2023-03-09 16:09:11.122039', '2023-03-09 16:09:11.122039', '2023-03-09 16:09:11.047');
INSERT INTO public.sessions VALUES (33, 1, 'cfd76bef-fcfd-4add-8c8a-b83ae3848c7b', '2023-03-09 16:09:28.362092', '2023-03-09 16:09:28.362092', '2023-03-09 16:09:28.301');
INSERT INTO public.sessions VALUES (34, 1, 'ce6ba7b9-8b49-49d3-b112-83d82b886317', '2023-03-09 16:24:57.710606', '2023-03-09 16:24:57.710606', '2023-03-09 16:24:57.646');
INSERT INTO public.sessions VALUES (35, 2, '1e5fd2b4-fd07-4481-9c07-8e2248cd751c', '2023-03-09 16:31:18.869115', '2023-03-09 16:31:18.869115', '2023-03-09 16:31:18.803');
INSERT INTO public.sessions VALUES (36, 1, '704a1437-38e8-42f6-9f7a-bbfa23147566', '2023-03-09 16:31:42.157129', '2023-03-09 16:31:42.157129', '2023-03-09 16:31:42.093');
INSERT INTO public.sessions VALUES (37, 1, '8933517f-b71e-442d-8ef7-14fbe1b802a6', '2023-03-09 16:52:12.000652', '2023-03-09 16:52:12.000652', '2023-03-09 16:52:11.934');
INSERT INTO public.sessions VALUES (38, 3, '30f704f3-3315-4d68-8e72-a2c67309754b', '2023-03-09 18:22:31.712403', '2023-03-09 18:22:31.712403', '2023-03-09 18:22:31.639');
INSERT INTO public.sessions VALUES (39, 2, '798939cd-86c2-4b78-9d9c-a505992fa897', '2023-03-09 18:40:38.6919', '2023-03-09 18:40:38.6919', '2023-03-09 18:40:38.626');
INSERT INTO public.sessions VALUES (40, 1, '43d7fc62-3892-4cea-827a-73c8bfc78d3a', '2023-03-09 18:42:06.960676', '2023-03-09 18:42:06.960676', '2023-03-09 18:42:06.894');
INSERT INTO public.sessions VALUES (41, 3, 'b403f115-6789-43be-9429-d71606f92214', '2023-03-09 18:42:19.409032', '2023-03-09 18:42:19.409032', '2023-03-09 18:42:19.346');
INSERT INTO public.sessions VALUES (42, 1, 'aad65b83-3ff5-4d18-a479-22a01a819a4b', '2023-03-09 18:44:10.040201', '2023-03-09 18:44:10.040201', '2023-03-09 18:44:09.971');
INSERT INTO public.sessions VALUES (43, 3, '57fdb053-a7d7-4c86-9887-12f952708f6a', '2023-03-09 18:44:19.263388', '2023-03-09 18:44:19.263388', '2023-03-09 18:44:19.202');
INSERT INTO public.sessions VALUES (44, 1, 'fa47ffe4-ca48-4a7a-911f-8ff4fb0f5ebe', '2023-03-09 18:44:30.270463', '2023-03-09 18:44:30.270463', '2023-03-09 18:44:30.197');
INSERT INTO public.sessions VALUES (45, 1, 'db8a397d-35b4-4508-92ad-80b605150602', '2023-03-10 14:43:27.655052', '2023-03-10 14:43:27.655052', '2023-03-10 14:43:27.592');
INSERT INTO public.sessions VALUES (46, 1, '81c220cc-2dd6-441a-8dbe-19576af141fe', '2023-03-10 15:26:15.404562', '2023-03-10 15:26:15.404562', '2023-03-10 15:26:15.341');
INSERT INTO public.sessions VALUES (47, 1, '3051a739-0bf4-4f59-a978-6dab9e5fe3a2', '2023-03-10 15:55:00.61492', '2023-03-10 15:55:00.61492', '2023-03-10 15:55:00.551');
INSERT INTO public.sessions VALUES (48, 4, 'a350baae-ca20-4ba5-95e5-90acce15c107', '2023-03-22 17:03:19.831912', '2023-03-22 17:03:19.831912', '2023-03-22 17:03:19.768');
INSERT INTO public.sessions VALUES (49, 4, '789bd03f-99ec-4f68-b250-8339382b3734', '2023-03-22 17:04:25.19347', '2023-03-22 17:04:25.19347', '2023-03-22 17:04:25.127');
INSERT INTO public.sessions VALUES (50, 5, '7730412a-5f7d-4541-a3e6-5c6715d2379b', '2023-03-22 17:05:58.093651', '2023-03-22 17:05:58.093651', '2023-03-22 17:05:58.035');
INSERT INTO public.sessions VALUES (51, 4, '23cb2061-01da-4641-908b-59cf9ec7330a', '2023-03-22 17:07:34.24083', '2023-03-22 17:07:34.24083', '2023-03-22 17:07:34.177');
INSERT INTO public.sessions VALUES (52, 1, '0330cc50-18c4-4142-a3d4-af585271257c', '2023-03-22 17:08:18.598011', '2023-03-22 17:08:18.598011', '2023-03-22 17:08:18.529');
INSERT INTO public.sessions VALUES (53, 4, '081bdea3-ff55-448c-96e9-c81d4bed7656', '2023-03-23 23:20:31.84736', '2023-03-23 23:20:31.84736', '2023-03-23 23:20:31.782');
INSERT INTO public.sessions VALUES (54, 1, '2d502251-ea86-481c-ac96-ae0ce63c6818', '2023-03-23 23:21:16.504565', '2023-03-23 23:21:16.504565', '2023-03-23 23:21:16.442');


--
-- Data for Name: shares; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'jonatas', 'jonatas@jonatas.com', '$2b$10$xhVR1ojBBfgf0mMp0XZnq.q8eXT2TcHzCLr4Zb5/ZOl8oXjJxAqqm', 'https://img.freepik.com/vetores-gratis/logotipo-da-banana-legal-usando-oculos-escuros_23-2148742786.jpg?w=2000', '2023-03-07 22:50:03.622614', '2023-03-07 22:50:03.622');
INSERT INTO public.users VALUES (2, 'jose', 'jose@jose.com', '$2b$10$FUr.Y/GLYU4dZ1YvUTbvVO3aBkGB/I1wGe8CphmyRhRrDue.Sp2xa', 'https://img.freepik.com/vetores-gratis/logotipo-da-banana-legal-usando-oculos-escuros_23-2148742786.jpg?w=2000', '2023-03-09 16:31:01.325605', '2023-03-09 16:31:01.324');
INSERT INTO public.users VALUES (3, 'lalala', 'jon@jon.com', '$2b$10$1DXsG3lPT5r.Qp096Ir/gejGZSfBtQQs5c6BVls/3M/wpLwPgFzEC', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', '2023-03-09 18:08:43.706664', '2023-03-09 18:08:43.706');
INSERT INTO public.users VALUES (4, 'ana', 'ana@ana.com', '$2b$10$AR3LyCc4pEinHJvbmU9MUu3t/W/owcwkNCGwKnD/wMUflqcLpOJTa', 'https://img.freepik.com/vetores-gratis/logotipo-da-banana-legal-usando-oculos-escuros_23-2148742786.jpg?w=2000', '2023-03-10 14:40:20.271916', '2023-03-10 14:40:20.271');
INSERT INTO public.users VALUES (5, 'lalala', 'lala@lala.com', '$2b$10$Ru69vOK5lfqSwyYAC13lZuoxJ1NOXW3VYcZH14W6qNnDQaJTb.AM.', 'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png', '2023-03-22 17:05:50.881862', '2023-03-22 17:05:50.881');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 23, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 13, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 17, true);


--
-- Name: info_link_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.info_link_post_id_seq', 3, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 26, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 20, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 54, true);


--
-- Name: shares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shares_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: info_link_post info_link_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.info_link_post
    ADD CONSTRAINT info_link_post_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shares shares_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: followers followers_followed_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_followed_id_fkey FOREIGN KEY (followed_id) REFERENCES public.users(id);


--
-- Name: followers followers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: hashtags hashtags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: info_link_post info_link_post_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.info_link_post
    ADD CONSTRAINT info_link_post_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: shares shares_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: shares shares_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

