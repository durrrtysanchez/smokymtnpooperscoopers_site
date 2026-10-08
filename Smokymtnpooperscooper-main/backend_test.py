import requests
import json
from datetime import datetime

# Backend API base URL
BASE_URL = "http://localhost:8001/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(success, message, details=None):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")
    if details:
        print(f"Details: {json.dumps(details, indent=2)}")

def test_post_contact_valid():
    """Test POST /api/contact/ with valid data"""
    print_test_header("POST /api/contact/ - Valid Contact Submission")
    
    payload = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@example.com",
        "phone": "865-555-1234",
        "message": "I'm interested in weekly service for my backyard. I have two large dogs."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact/", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get("success") and data.get("id") and data.get("message"):
                print_result(True, "Valid contact submission successful")
                return data.get("id")
            else:
                print_result(False, "Response missing required fields", data)
                return None
        else:
            print_result(False, f"Expected 201, got {response.status_code}", response.json())
            return None
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return None

def test_post_contact_invalid_email():
    """Test POST /api/contact/ with invalid email format"""
    print_test_header("POST /api/contact/ - Invalid Email Format")
    
    payload = {
        "name": "Mike Thompson",
        "email": "invalid-email-format",
        "phone": "865-555-5678",
        "message": "Need pricing information for weekly service"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact/", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Invalid email correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected 422 validation error, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return False

def test_post_contact_missing_name():
    """Test POST /api/contact/ with missing name field"""
    print_test_header("POST /api/contact/ - Missing Required Field (name)")
    
    payload = {
        "email": "test@example.com",
        "message": "This submission is missing the name field"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact/", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Missing name field correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected 422 validation error, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return False

def test_post_contact_missing_email():
    """Test POST /api/contact/ with missing email field"""
    print_test_header("POST /api/contact/ - Missing Required Field (email)")
    
    payload = {
        "name": "Bob Smith",
        "message": "This submission is missing the email field"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact/", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Missing email field correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected 422 validation error, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return False

def test_post_contact_missing_message():
    """Test POST /api/contact/ with missing message field"""
    print_test_header("POST /api/contact/ - Missing Required Field (message)")
    
    payload = {
        "name": "Alice Brown",
        "email": "alice@example.com"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact/", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Missing message field correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected 422 validation error, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return False

def test_post_contact_optional_phone():
    """Test POST /api/contact/ without optional phone field"""
    print_test_header("POST /api/contact/ - Without Optional Phone Field")
    
    payload = {
        "name": "Jennifer Davis",
        "email": "jennifer.davis@example.com",
        "message": "I don't want to provide my phone number. Please contact me via email."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact/", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get("success"):
                print_result(True, "Contact submission without phone successful (phone is optional)")
                return data.get("id")
            else:
                print_result(False, "Response missing success field", data)
                return None
        else:
            print_result(False, f"Expected 201, got {response.status_code}", response.json())
            return None
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return None

def test_get_contacts():
    """Test GET /api/contact/ to retrieve all contact submissions"""
    print_test_header("GET /api/contact/ - Retrieve All Contact Submissions")
    
    try:
        response = requests.get(f"{BASE_URL}/contact/", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if data.get("success") and "contacts" in data:
                contacts = data.get("contacts", [])
                print(f"\nTotal contacts retrieved: {len(contacts)}")
                
                if len(contacts) > 0:
                    print("\nSample contact (first entry):")
                    print(json.dumps(contacts[0], indent=2))
                    
                    # Verify contact structure
                    first_contact = contacts[0]
                    required_fields = ["id", "name", "email", "message", "createdAt"]
                    missing_fields = [field for field in required_fields if field not in first_contact]
                    
                    if missing_fields:
                        print_result(False, f"Contact missing required fields: {missing_fields}")
                        return False
                    else:
                        print_result(True, f"Successfully retrieved {len(contacts)} contact(s) with correct structure")
                        return True
                else:
                    print_result(True, "GET request successful but no contacts found (database may be empty)")
                    return True
            else:
                print_result(False, "Response missing 'success' or 'contacts' field", data)
                return False
        else:
            print_result(False, f"Expected 200, got {response.status_code}", response.json())
            return False
    except Exception as e:
        print_result(False, f"Request failed: {str(e)}")
        return False

def test_data_persistence(contact_id):
    """Verify that submitted contact is actually saved in database"""
    print_test_header("Data Persistence - Verify Contact Saved in MongoDB")
    
    if not contact_id:
        print_result(False, "No contact ID provided, skipping persistence test")
        return False
    
    try:
        response = requests.get(f"{BASE_URL}/contact/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            contacts = data.get("contacts", [])
            
            # Search for the contact with the given ID
            found_contact = None
            for contact in contacts:
                if contact.get("id") == contact_id:
                    found_contact = contact
                    break
            
            if found_contact:
                print(f"Found contact in database:")
                print(json.dumps(found_contact, indent=2))
                print_result(True, f"Contact with ID {contact_id} successfully persisted in MongoDB")
                return True
            else:
                print_result(False, f"Contact with ID {contact_id} not found in database")
                return False
        else:
            print_result(False, f"Failed to retrieve contacts for verification: {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Persistence check failed: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("SMOKY MOUNTAIN POOPER SCOOPERS - BACKEND API TEST SUITE")
    print("="*80)
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Backend URL: {BASE_URL}")
    
    results = {
        "passed": 0,
        "failed": 0,
        "total": 0
    }
    
    # Test 1: Valid contact submission
    contact_id = test_post_contact_valid()
    results["total"] += 1
    if contact_id:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 2: Invalid email format
    results["total"] += 1
    if test_post_contact_invalid_email():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 3: Missing name field
    results["total"] += 1
    if test_post_contact_missing_name():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 4: Missing email field
    results["total"] += 1
    if test_post_contact_missing_email():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 5: Missing message field
    results["total"] += 1
    if test_post_contact_missing_message():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 6: Optional phone field
    contact_id_2 = test_post_contact_optional_phone()
    results["total"] += 1
    if contact_id_2:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 7: GET all contacts
    results["total"] += 1
    if test_get_contacts():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 8: Data persistence verification
    results["total"] += 1
    if test_data_persistence(contact_id):
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total Tests: {results['total']}")
    print(f"Passed: {results['passed']} ✅")
    print(f"Failed: {results['failed']} ❌")
    print(f"Success Rate: {(results['passed']/results['total']*100):.1f}%")
    print("="*80)
    
    return results

if __name__ == "__main__":
    run_all_tests()
