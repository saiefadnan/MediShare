/*triggers */
/*1 */
CREATE OR REPLACE FUNCTION update_userinfo_username()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the username in the userInfo table when first_name is updated in updateprofile (2 ta table ei updated hocche naam ta)
  UPDATE public."userInfo"
  SET username = NEW.first_name
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_username
AFTER INSERT OR UPDATE ON public.updateprofile
FOR EACH ROW
EXECUTE FUNCTION update_userinfo_username();


/*2 */




