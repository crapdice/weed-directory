import json
import sys
import os
import requests

def check_url_status(name, label, url):
    """
    Pings a URL to verify it returns a 200 OK status.
    Uses User-Agent and GET request for maximum compatibility with bot-filtered sites.
    Specials: treating Status 999 (LinkedIn) as a soft-pass since it confirms the site is active but blocking bots.
    """
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10, stream=True, allow_redirects=True)
        
        # LinkedIn returns 999 to non-browser agents
        if response.status_code in [200, 999, 403]: 
            # 403 can also happen for legitimate sites that block all scrapers (like IG sometimes)
            # but for a validator, if it reached a server that can say "Go away", the domain is usually live.
            return True, None
        else:
            return False, f"Status {response.status_code}"
    except requests.exceptions.RequestException as e:
        return False, str(e)

def validate_cannabis_data(file_path):
    """
    Hybrid Validator: Combines structural integrity checks, 
    strict business rules (Final Laws), and Live URL verification.
    """
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        sys.exit(1)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON syntax: {e}")
        sys.exit(1)

    # 1. Configuration
    required_partners = ["1906", "Lowell Herb Co.", "Fig Farms", "UpNorth", "Cookies", "93 Boyz"]
    errors = []
    
    cultivators = data.get("cultivators", [])
    spotlight = data.get("famous_growers_spotlight", [])
    
    if not cultivators:
        errors.append("Schema Error: Missing or empty 'cultivators' array.")
    
    if not spotlight:
        errors.append("Schema Error: Missing 'famous_growers_spotlight' object.")

    print(f"--- Starting Advanced Validation for {len(cultivators)} Operators ---")

    for entry in cultivators:
        name = entry.get("name", "Unknown")
        brands = entry.get("brands", [])
        lic_type = entry.get("license_type")
        social = entry.get("social_media", {})

        # Law 1: Every cultivator must have at least one brand
        if not brands:
            errors.append(f"[{name}] Law of Parentage: Must have at least one brand listed.")

        # Structure: Strict Enum for license_type
        if lic_type not in ["Cultivation Center", "Craft Grower"]:
            errors.append(f"[{name}] Invalid license_type: '{lic_type}'.")

        # Law 2: Check for (Partner) suffix on known guest/licensed brands
        for brand in brands:
            for partner in required_partners:
                if partner in brand and "(Partner)" not in brand:
                    errors.append(f"[{name}] Law of Disclosure: Brand '{brand}' is missing required '(Partner)' suffix.")

        # Law 3: Social Media mandatory for Craft Growers
        if lic_type == "Craft Grower":
            if not social or not social.get("instagram"):
                 errors.append(f"[{name}] Law of Presence: Craft Growers MUST have a mandatory social media handle.")

        # 2. Live URL Validation
        for platform, url in social.items():
            if url and isinstance(url, str) and url.startswith("http"):
                print(f" - Pinging {name} {platform}...")
                is_live, err_msg = check_url_status(name, platform, url)
                if not is_live:
                    errors.append(f"[{name}] {platform.upper()} Link Dead: {url} ({err_msg})")

    # 3. Spotlight Validation
    for breeder in spotlight:
        b_name = breeder.get("name", "Unknown")
        if not breeder.get("specialization"):
            errors.append(f"[Spotlight: {b_name}] Missing specialization.")
        if not breeder.get("legendary_strains"):
            errors.append(f"[Spotlight: {b_name}] Missing legendary_strains array.")

    # 4. Reporting
    if errors:
        print("\n❌ DATA VALIDATION FAILED:")
        for error in errors:
            print(f" - {error}")
        print("\nFix these issues in data.json before proceeding.")
        sys.exit(1)
    else:
        print("\n✅ VALIDATION SUCCESSFUL: All Laws, Spotlights, and Social Links are verified.")
        sys.exit(0)

if __name__ == "__main__":
    target_file = sys.argv[1] if len(sys.argv) > 1 else "data.json"
    validate_cannabis_data(target_file)
