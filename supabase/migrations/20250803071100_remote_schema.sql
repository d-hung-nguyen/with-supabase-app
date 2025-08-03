drop function if exists "public"."create_rls_policy"(table_name text, table_schema text, policy_name text, policy_operation text, policy_definition text);

drop function if exists "public"."disable_rls"(table_name text, table_schema text);

drop function if exists "public"."enable_extension"(extension_name text);

drop function if exists "public"."enable_rls"(table_name text, table_schema text);

drop function if exists "public"."get_available_extensions"();

drop function if exists "public"."get_database_size"();

drop function if exists "public"."get_installed_extensions"();

drop function if exists "public"."get_table_columns"(table_name text, table_schema text);

drop function if exists "public"."get_table_relationships"(table_name text, table_schema text);

drop function if exists "public"."get_table_stats"(table_name text, table_schema text);

drop function if exists "public"."get_tables_fallback"(schema_name text);

create table "public"."agencies" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "region_id" uuid,
    "status" text default 'pending'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "address" text,
    "zip_code" character varying(20),
    "city" text,
    "country" text
);


create table "public"."bookings" (
    "id" uuid not null default gen_random_uuid(),
    "agent_id" uuid,
    "hotel_id" uuid,
    "confirmation_number" text not null,
    "guest_name" text not null,
    "arrival_date" date not null,
    "nights" integer not null,
    "room_type" text,
    "status" text default 'pending'::text,
    "points_awarded" integer default 0,
    "validated_by" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."bookings" enable row level security;

create table "public"."campaign" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "start_date" date not null,
    "end_date" date not null,
    "bonus_multiplier" numeric(3,2) default 1.0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."hotels" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "location" text,
    "region_id" uuid,
    "status" text default 'active'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."points_ledger" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "booking_id" uuid,
    "points" integer not null,
    "type" text,
    "notes" text,
    "created_at" timestamp with time zone default now()
);


create table "public"."regions" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."rewards" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "points_redeemed" integer not null,
    "voucher_code" text not null,
    "vendor" text,
    "status" text default 'issued'::text,
    "issued_by" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."room_types" (
    "id" uuid not null default uuid_generate_v4(),
    "hotel_id" uuid not null,
    "type_name" character varying(100) not null
);


create table "public"."users" (
    "id" uuid not null default auth.uid(),
    "email" text not null,
    "role" text not null,
    "agency_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "first_name" text,
    "last_name" text,
    "telephone" character varying(30),
    "hotel_id" uuid
);


CREATE UNIQUE INDEX agencies_pkey ON public.agencies USING btree (id);

CREATE UNIQUE INDEX bookings_pkey ON public.bookings USING btree (id);

CREATE UNIQUE INDEX competitions_pkey ON public.campaign USING btree (id);

CREATE UNIQUE INDEX hotels_pkey ON public.hotels USING btree (id);

CREATE UNIQUE INDEX points_ledger_pkey ON public.points_ledger USING btree (id);

CREATE UNIQUE INDEX regions_pkey ON public.regions USING btree (id);

CREATE UNIQUE INDEX rewards_pkey ON public.rewards USING btree (id);

CREATE UNIQUE INDEX room_types_pkey ON public.room_types USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."agencies" add constraint "agencies_pkey" PRIMARY KEY using index "agencies_pkey";

alter table "public"."bookings" add constraint "bookings_pkey" PRIMARY KEY using index "bookings_pkey";

alter table "public"."campaign" add constraint "competitions_pkey" PRIMARY KEY using index "competitions_pkey";

alter table "public"."hotels" add constraint "hotels_pkey" PRIMARY KEY using index "hotels_pkey";

alter table "public"."points_ledger" add constraint "points_ledger_pkey" PRIMARY KEY using index "points_ledger_pkey";

alter table "public"."regions" add constraint "regions_pkey" PRIMARY KEY using index "regions_pkey";

alter table "public"."rewards" add constraint "rewards_pkey" PRIMARY KEY using index "rewards_pkey";

alter table "public"."room_types" add constraint "room_types_pkey" PRIMARY KEY using index "room_types_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."agencies" add constraint "agencies_region_id_fkey" FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE not valid;

alter table "public"."agencies" validate constraint "agencies_region_id_fkey";

alter table "public"."agencies" add constraint "agencies_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'active'::text, 'archived'::text]))) not valid;

alter table "public"."agencies" validate constraint "agencies_status_check";

alter table "public"."bookings" add constraint "bookings_agent_id_fkey" FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."bookings" validate constraint "bookings_agent_id_fkey";

alter table "public"."bookings" add constraint "bookings_hotel_id_fkey" FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE not valid;

alter table "public"."bookings" validate constraint "bookings_hotel_id_fkey";

alter table "public"."bookings" add constraint "bookings_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'declined'::text, 'mixed'::text]))) not valid;

alter table "public"."bookings" validate constraint "bookings_status_check";

alter table "public"."bookings" add constraint "bookings_validated_by_fkey" FOREIGN KEY (validated_by) REFERENCES users(id) not valid;

alter table "public"."bookings" validate constraint "bookings_validated_by_fkey";

alter table "public"."hotels" add constraint "hotels_region_id_fkey" FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE not valid;

alter table "public"."hotels" validate constraint "hotels_region_id_fkey";

alter table "public"."hotels" add constraint "hotels_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text]))) not valid;

alter table "public"."hotels" validate constraint "hotels_status_check";

alter table "public"."points_ledger" add constraint "points_ledger_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES bookings(id) not valid;

alter table "public"."points_ledger" validate constraint "points_ledger_booking_id_fkey";

alter table "public"."points_ledger" add constraint "points_ledger_type_check" CHECK ((type = ANY (ARRAY['booking'::text, 'bonus'::text, 'redemption'::text]))) not valid;

alter table "public"."points_ledger" validate constraint "points_ledger_type_check";

alter table "public"."points_ledger" add constraint "points_ledger_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."points_ledger" validate constraint "points_ledger_user_id_fkey";

alter table "public"."rewards" add constraint "rewards_issued_by_fkey" FOREIGN KEY (issued_by) REFERENCES users(id) not valid;

alter table "public"."rewards" validate constraint "rewards_issued_by_fkey";

alter table "public"."rewards" add constraint "rewards_status_check" CHECK ((status = ANY (ARRAY['issued'::text, 'redeemed'::text, 'expired'::text]))) not valid;

alter table "public"."rewards" validate constraint "rewards_status_check";

alter table "public"."rewards" add constraint "rewards_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."rewards" validate constraint "rewards_user_id_fkey";

alter table "public"."room_types" add constraint "room_types_hotel_id_fkey" FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE not valid;

alter table "public"."room_types" validate constraint "room_types_hotel_id_fkey";

alter table "public"."users" add constraint "users_agency_id_fkey" FOREIGN KEY (agency_id) REFERENCES agencies(id) not valid;

alter table "public"."users" validate constraint "users_agency_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_hotel_id_fkey" FOREIGN KEY (hotel_id) REFERENCES hotels(id) not valid;

alter table "public"."users" validate constraint "users_hotel_id_fkey";

alter table "public"."users" add constraint "users_role_check" CHECK ((role = ANY (ARRAY['agent'::text, 'hotel_admin'::text, 'regional_admin'::text, 'global_admin'::text]))) not valid;

alter table "public"."users" validate constraint "users_role_check";

grant delete on table "public"."agencies" to "anon";

grant insert on table "public"."agencies" to "anon";

grant references on table "public"."agencies" to "anon";

grant select on table "public"."agencies" to "anon";

grant trigger on table "public"."agencies" to "anon";

grant truncate on table "public"."agencies" to "anon";

grant update on table "public"."agencies" to "anon";

grant delete on table "public"."agencies" to "authenticated";

grant insert on table "public"."agencies" to "authenticated";

grant references on table "public"."agencies" to "authenticated";

grant select on table "public"."agencies" to "authenticated";

grant trigger on table "public"."agencies" to "authenticated";

grant truncate on table "public"."agencies" to "authenticated";

grant update on table "public"."agencies" to "authenticated";

grant delete on table "public"."agencies" to "service_role";

grant insert on table "public"."agencies" to "service_role";

grant references on table "public"."agencies" to "service_role";

grant select on table "public"."agencies" to "service_role";

grant trigger on table "public"."agencies" to "service_role";

grant truncate on table "public"."agencies" to "service_role";

grant update on table "public"."agencies" to "service_role";

grant delete on table "public"."bookings" to "anon";

grant insert on table "public"."bookings" to "anon";

grant references on table "public"."bookings" to "anon";

grant select on table "public"."bookings" to "anon";

grant trigger on table "public"."bookings" to "anon";

grant truncate on table "public"."bookings" to "anon";

grant update on table "public"."bookings" to "anon";

grant delete on table "public"."bookings" to "authenticated";

grant insert on table "public"."bookings" to "authenticated";

grant references on table "public"."bookings" to "authenticated";

grant select on table "public"."bookings" to "authenticated";

grant trigger on table "public"."bookings" to "authenticated";

grant truncate on table "public"."bookings" to "authenticated";

grant update on table "public"."bookings" to "authenticated";

grant delete on table "public"."bookings" to "service_role";

grant insert on table "public"."bookings" to "service_role";

grant references on table "public"."bookings" to "service_role";

grant select on table "public"."bookings" to "service_role";

grant trigger on table "public"."bookings" to "service_role";

grant truncate on table "public"."bookings" to "service_role";

grant update on table "public"."bookings" to "service_role";

grant delete on table "public"."campaign" to "anon";

grant insert on table "public"."campaign" to "anon";

grant references on table "public"."campaign" to "anon";

grant select on table "public"."campaign" to "anon";

grant trigger on table "public"."campaign" to "anon";

grant truncate on table "public"."campaign" to "anon";

grant update on table "public"."campaign" to "anon";

grant delete on table "public"."campaign" to "authenticated";

grant insert on table "public"."campaign" to "authenticated";

grant references on table "public"."campaign" to "authenticated";

grant select on table "public"."campaign" to "authenticated";

grant trigger on table "public"."campaign" to "authenticated";

grant truncate on table "public"."campaign" to "authenticated";

grant update on table "public"."campaign" to "authenticated";

grant delete on table "public"."campaign" to "service_role";

grant insert on table "public"."campaign" to "service_role";

grant references on table "public"."campaign" to "service_role";

grant select on table "public"."campaign" to "service_role";

grant trigger on table "public"."campaign" to "service_role";

grant truncate on table "public"."campaign" to "service_role";

grant update on table "public"."campaign" to "service_role";

grant delete on table "public"."hotels" to "anon";

grant insert on table "public"."hotels" to "anon";

grant references on table "public"."hotels" to "anon";

grant select on table "public"."hotels" to "anon";

grant trigger on table "public"."hotels" to "anon";

grant truncate on table "public"."hotels" to "anon";

grant update on table "public"."hotels" to "anon";

grant delete on table "public"."hotels" to "authenticated";

grant insert on table "public"."hotels" to "authenticated";

grant references on table "public"."hotels" to "authenticated";

grant select on table "public"."hotels" to "authenticated";

grant trigger on table "public"."hotels" to "authenticated";

grant truncate on table "public"."hotels" to "authenticated";

grant update on table "public"."hotels" to "authenticated";

grant delete on table "public"."hotels" to "service_role";

grant insert on table "public"."hotels" to "service_role";

grant references on table "public"."hotels" to "service_role";

grant select on table "public"."hotels" to "service_role";

grant trigger on table "public"."hotels" to "service_role";

grant truncate on table "public"."hotels" to "service_role";

grant update on table "public"."hotels" to "service_role";

grant delete on table "public"."points_ledger" to "anon";

grant insert on table "public"."points_ledger" to "anon";

grant references on table "public"."points_ledger" to "anon";

grant select on table "public"."points_ledger" to "anon";

grant trigger on table "public"."points_ledger" to "anon";

grant truncate on table "public"."points_ledger" to "anon";

grant update on table "public"."points_ledger" to "anon";

grant delete on table "public"."points_ledger" to "authenticated";

grant insert on table "public"."points_ledger" to "authenticated";

grant references on table "public"."points_ledger" to "authenticated";

grant select on table "public"."points_ledger" to "authenticated";

grant trigger on table "public"."points_ledger" to "authenticated";

grant truncate on table "public"."points_ledger" to "authenticated";

grant update on table "public"."points_ledger" to "authenticated";

grant delete on table "public"."points_ledger" to "service_role";

grant insert on table "public"."points_ledger" to "service_role";

grant references on table "public"."points_ledger" to "service_role";

grant select on table "public"."points_ledger" to "service_role";

grant trigger on table "public"."points_ledger" to "service_role";

grant truncate on table "public"."points_ledger" to "service_role";

grant update on table "public"."points_ledger" to "service_role";

grant delete on table "public"."regions" to "anon";

grant insert on table "public"."regions" to "anon";

grant references on table "public"."regions" to "anon";

grant select on table "public"."regions" to "anon";

grant trigger on table "public"."regions" to "anon";

grant truncate on table "public"."regions" to "anon";

grant update on table "public"."regions" to "anon";

grant delete on table "public"."regions" to "authenticated";

grant insert on table "public"."regions" to "authenticated";

grant references on table "public"."regions" to "authenticated";

grant select on table "public"."regions" to "authenticated";

grant trigger on table "public"."regions" to "authenticated";

grant truncate on table "public"."regions" to "authenticated";

grant update on table "public"."regions" to "authenticated";

grant delete on table "public"."regions" to "service_role";

grant insert on table "public"."regions" to "service_role";

grant references on table "public"."regions" to "service_role";

grant select on table "public"."regions" to "service_role";

grant trigger on table "public"."regions" to "service_role";

grant truncate on table "public"."regions" to "service_role";

grant update on table "public"."regions" to "service_role";

grant delete on table "public"."rewards" to "anon";

grant insert on table "public"."rewards" to "anon";

grant references on table "public"."rewards" to "anon";

grant select on table "public"."rewards" to "anon";

grant trigger on table "public"."rewards" to "anon";

grant truncate on table "public"."rewards" to "anon";

grant update on table "public"."rewards" to "anon";

grant delete on table "public"."rewards" to "authenticated";

grant insert on table "public"."rewards" to "authenticated";

grant references on table "public"."rewards" to "authenticated";

grant select on table "public"."rewards" to "authenticated";

grant trigger on table "public"."rewards" to "authenticated";

grant truncate on table "public"."rewards" to "authenticated";

grant update on table "public"."rewards" to "authenticated";

grant delete on table "public"."rewards" to "service_role";

grant insert on table "public"."rewards" to "service_role";

grant references on table "public"."rewards" to "service_role";

grant select on table "public"."rewards" to "service_role";

grant trigger on table "public"."rewards" to "service_role";

grant truncate on table "public"."rewards" to "service_role";

grant update on table "public"."rewards" to "service_role";

grant delete on table "public"."room_types" to "anon";

grant insert on table "public"."room_types" to "anon";

grant references on table "public"."room_types" to "anon";

grant select on table "public"."room_types" to "anon";

grant trigger on table "public"."room_types" to "anon";

grant truncate on table "public"."room_types" to "anon";

grant update on table "public"."room_types" to "anon";

grant delete on table "public"."room_types" to "authenticated";

grant insert on table "public"."room_types" to "authenticated";

grant references on table "public"."room_types" to "authenticated";

grant select on table "public"."room_types" to "authenticated";

grant trigger on table "public"."room_types" to "authenticated";

grant truncate on table "public"."room_types" to "authenticated";

grant update on table "public"."room_types" to "authenticated";

grant delete on table "public"."room_types" to "service_role";

grant insert on table "public"."room_types" to "service_role";

grant references on table "public"."room_types" to "service_role";

grant select on table "public"."room_types" to "service_role";

grant trigger on table "public"."room_types" to "service_role";

grant truncate on table "public"."room_types" to "service_role";

grant update on table "public"."room_types" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Agent can insert own bookings"
on "public"."bookings"
as permissive
for insert
to public
with check (((auth.uid() = agent_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Agent can select own bookings"
on "public"."bookings"
as permissive
for select
to public
using (((auth.uid() = agent_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Agent insert own bookings"
on "public"."bookings"
as permissive
for insert
to public
with check (((auth.uid() = agent_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Agent select own bookings"
on "public"."bookings"
as permissive
for select
to public
using (((auth.uid() = agent_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Agents can insert own bookings"
on "public"."bookings"
as permissive
for insert
to public
with check ((auth.uid() = agent_id));


create policy "Agents can manage own bookings"
on "public"."bookings"
as permissive
for select
to public
using ((auth.uid() = agent_id));


create policy "Global admin full access bookings"
on "public"."bookings"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'global_admin'::text)))));


create policy "Global admins can do everything"
on "public"."bookings"
as permissive
for all
to public
using ((auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.role = 'global_admin'::text))));


create policy "Hotel admins can view bookings of their hotel"
on "public"."bookings"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.role = 'hotel_admin'::text))));


create policy "Admins can view points"
on "public"."points_ledger"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = ANY (ARRAY['hotel_admin'::text, 'regional_admin'::text]))))));


create policy "Admins select points"
on "public"."points_ledger"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = ANY (ARRAY['hotel_admin'::text, 'regional_admin'::text, 'global_admin'::text]))))));


create policy "Agent can view own points"
on "public"."points_ledger"
as permissive
for select
to public
using (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Agent select own points"
on "public"."points_ledger"
as permissive
for select
to public
using (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Global admin full access points"
on "public"."points_ledger"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'global_admin'::text)))));


create policy "Agent can view own rewards"
on "public"."rewards"
as permissive
for select
to public
using (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Agent select own rewards"
on "public"."rewards"
as permissive
for select
to public
using (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'agent'::text))))));


create policy "Global admin full access rewards"
on "public"."rewards"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'global_admin'::text)))));


create policy "Regional admin view rewards"
on "public"."rewards"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.role = 'regional_admin'::text)))));



