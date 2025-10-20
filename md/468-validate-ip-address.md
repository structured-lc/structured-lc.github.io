### Leetcode 468 (Medium): Validate IP Address [Practice](https://leetcode.com/problems/validate-ip-address)

### Description  
Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a correct IP of any type. A valid IPv4 address is in the form "x1.x2.x3.x4" where 0 ≤ xi ≤ 255 and xi cannot contain leading zeros. A valid IPv6 address is in the form "x1:x2:x3:x4:x5:x6:x7:x8" where 1 ≤ xi.length ≤ 4, xi is hexadecimal (digits, 'a'-'f', 'A'-'F'), and leading zeros are allowed.

### Examples  

**Example 1:**  
Input: `queryIP = "172.16.254.1"`  
Output: `"IPv4"`  
*Explanation: This is a valid IPv4 address, return "IPv4".*

**Example 2:**  
Input: `queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"`  
Output: `"IPv6"`  
*Explanation: This is a valid IPv6 address, return "IPv6".*

**Example 3:**  
Input: `queryIP = "256.256.256.256"`  
Output: `"Neither"`  
*Explanation: This is neither an IPv4 address nor an IPv6 address.*


### Thought Process (as if you're the interviewee)  
This is a string validation problem with specific rules for two different IP address formats.

**Approach:**
1. First determine if it could be IPv4 (contains '.') or IPv6 (contains ':')
2. Split by the appropriate delimiter and validate each part
3. Apply specific validation rules for each format

**IPv4 Validation Rules:**
- Exactly 4 parts separated by '.'
- Each part: 0 ≤ value ≤ 255
- No leading zeros (except for "0" itself)
- Only digits allowed

**IPv6 Validation Rules:**
- Exactly 8 parts separated by ':'
- Each part: 1-4 characters long
- Only hexadecimal characters (0-9, a-f, A-F)
- Leading zeros are allowed

**Edge Cases to Handle:**
- Empty parts (e.g., "1..2.3.4" or "1::2")
- Invalid characters
- Numbers out of range
- Wrong number of parts


### Corner cases to consider  
- Empty string: Should return "Neither"  
- Mixed delimiters: Should return "Neither"  
- Leading/trailing delimiters: Should return "Neither"  
- Empty parts between delimiters: Should return "Neither"  
- IPv4 with leading zeros: Should return "Neither" (except "0")  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def validIPAddress(queryIP):
    def is_valid_ipv4(ip):
        parts = ip.split('.')
        
        # Must have exactly 4 parts
        if len(parts) != 4:
            return False
        
        for part in parts:
            # Each part must be non-empty
            if not part:
                return False
            
            # Check for leading zeros (except "0" itself)
            if len(part) > 1 and part[0] == '0':
                return False
            
            # Must contain only digits
            if not part.isdigit():
                return False
            
            # Must be in range [0, 255]
            num = int(part)
            if num > 255:
                return False
        
        return True
    
    def is_valid_ipv6(ip):
        parts = ip.split(':')
        
        # Must have exactly 8 parts
        if len(parts) != 8:
            return False
        
        for part in parts:
            # Each part must be non-empty and 1-4 characters
            if not part or len(part) > 4:
                return False
            
            # Must contain only valid hexadecimal characters
            for char in part:
                if not ((char >= '0' and char <= '9') or 
                       (char >= 'a' and char <= 'f') or 
                       (char >= 'A' and char <= 'F')):
                    return False
        
        return True
    
    # Determine IP type by looking for delimiters
    if '.' in queryIP and ':' not in queryIP:
        # Potential IPv4
        if is_valid_ipv4(queryIP):
            return "IPv4"
    elif ':' in queryIP and '.' not in queryIP:
        # Potential IPv6
        if is_valid_ipv6(queryIP):
            return "IPv6"
    
    return "Neither"

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the input string. We iterate through the string for splitting and validate each character at most once.
- **Space Complexity:** O(1) since we only store the split parts (at most 8 parts for IPv6) and use constant extra space for validation.


### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to also validate IPv4 addresses with CIDR notation (e.g., "192.168.1.0/24")?  
  *Hint: Split by '/' first, validate the IP part normally, then validate the subnet mask is between 0-32*

- What if you needed to normalize valid IP addresses (e.g., remove leading zeros from IPv6)?  
  *Hint: During validation, build the normalized version by converting each valid part to its canonical form*

- How would you handle IPv6 addresses with double colon notation (::) for zero compression?  
  *Hint: This is a more complex problem requiring expansion of the :: notation before applying current validation logic*

### Summary
This problem demonstrates careful string parsing and validation with multiple sets of rules. The key is to separate the logic cleanly for each IP type and handle all edge cases systematically. The approach of first determining the likely IP type based on delimiters, then applying specific validation rules, makes the solution more readable and maintainable. This pattern of rule-based validation appears frequently in input parsing and data validation problems.


### Flashcard
Split by '.' or ':' to distinguish IPv4/IPv6, then validate each part according to strict format and value rules.

### Tags
String(#string)

### Similar Problems
- IP to CIDR(ip-to-cidr) (Medium)
- Strong Password Checker II(strong-password-checker-ii) (Easy)