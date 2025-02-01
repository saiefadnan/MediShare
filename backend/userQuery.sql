create table updateProfile (
  id serial primary key, -- Auto-incremented ID
  email text not null, -- Store user's email
  first_name text, -- Store first name
  last_name text, -- Store last name
  contact_number text check (length(contact_number) = 11), -- Validate 11-digit contact number
  address_line_1 text, -- Address line 1
  address_line_2 text, -- Address line 2
  division text, -- Division field
  zip_code text, -- Zip code
  created_at timestamp default now(), -- Timestamp for when the profile was updated
  profile_picture_url text -- URL for the profile picture (can be null)

);
