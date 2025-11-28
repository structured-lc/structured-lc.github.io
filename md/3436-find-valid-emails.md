### Leetcode 3436 (Easy): Find Valid Emails [Practice](https://leetcode.com/problems/find-valid-emails)

### Description  
Given a table with users' emails, return all valid emails ordered by user_id. An email is valid if:
- It contains **exactly one '@'**.
- It **ends with '.com'**.
- The part before '@' contains **only letters, numbers, or underscores**.
- The domain name (between '@' and '.com') contains **only letters**.

### Examples  

**Example 1:**  
Input:  
Users =  
| user_id | email              |
|---------|--------------------|
|   1     | alice@example.com  |
|   2     | bob_at_example.com |
|   3     | joe@example.org    |
|   4     | mary@domain.com    |
|   5     | eve@invalid        |  
Output:  
| user_id | email              |
|---------|--------------------|
|   1     | alice@example.com  |
|   4     | mary@domain.com    |  
Explanation:  
- alice@example.com is valid (all criteria met).
- bob_at_example.com: invalid, no '@'.
- joe@example.org: invalid, does not end with '.com'.
- mary@domain.com: valid.
- eve@invalid: invalid, does not end with '.com'.

**Example 2:**  
Input:  
| user_id | email             |
|---------|-------------------|
|   8     | abc@xyz.com       |
|   9     | test_123@abc.com  |  
Output:  
| user_id | email             |
|---------|-------------------|
|   8     | abc@xyz.com       |
|   9     | test_123@abc.com  |  
Explanation:  
Both emails meet all constraints and are valid.

**Example 3:**  
Input:  
| user_id | email             |
|---------|-------------------|
|   14    | a@b.com           |
|   15    | Z9_@AZB.com       |
|   17    | bad@3xp1.com      |  
Output:  
| user_id | email             |
|---------|-------------------|
|   14    | a@b.com           |
|   15    | Z9_@AZB.com       |  
Explanation:  
- a@b.com: all valid.
- Z9_@AZB.com: all valid.
- bad@3xp1.com: domain part contains digits, which is not allowed.


### Thought Process (as if you’re the interviewee)  
Start by reading and parsing every email:
- To check for one '@', count the symbol. 
- To check ending, ensure the email ends with '.com'.
- Before '@', verify it is alphanumeric or underscore.
- For the domain, check that only letters exist (between '@' and '.com').
A brute-force method would involve splitting each email, then checking the respective parts using only code (no regex libraries). If any condition fails, skip the email.  
Optimization is limited since conditions must be strictly checked for each email.  
Trade-off: Using regex is concise, but a manual check is often preferred for clarity and interviews.

### Corner cases to consider  
- Emails with multiple '@' symbols.
- Emails not containing '@' at all.
- Emails not ending with '.com' (like '.org', '.co', etc).
- No user rows or empty emails field.
- User id is not sorted.
- Upper and lowercase letters in all positions.
- Domain names with numbers, hyphens, underscores, etc.
- Username contains other symbols like '-'.

### Solution

```python
def find_valid_emails(users):
    # Results list to store tuples of (user_id, email)
    result = []
    
    for user in users:
        user_id, email = user['user_id'], user['email']

        # 1. Check for exactly one '@'
        if email.count('@') != 1:
            continue
        
        name, rest = email.split('@')
        # 2. Check if email ends with '.com'
        if not rest.endswith('.com'):
            continue

        # 3. Validate name part: only letters, numbers, underscores
        if not all(ch.isalnum() or ch == '_' for ch in name):
            continue
        
        # 4. Extract domain (between '@' and '.com') and validate (letters only)
        domain = rest[:-4]  # remove '.com'
        if not domain.isalpha():
            continue
        
        # If all conditions met, add to results
        result.append({'user_id': user_id, 'email': email})

    # Sort results by user_id
    result.sort(key=lambda x: x['user_id'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  Where n = number of users, m = length of the longest email. Each email is split and scanned for validation in O(m).
- **Space Complexity:** O(k)  
  Where k = number of valid emails (output size). Minimal extra storage (no hidden recursion or complex data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support more complex email validation (e.g., allow digits in the domain, accept more domain endings)?
  *Hint: Modularize checking functions for flexibility; parameterize allowed chars/endings.*

- Can you efficiently validate a very large dataset (millions of emails)?
  *Hint: Consider streaming approach and early rejection on invalid pattern.*

- How would you adapt this logic for live user signup form (not just batch database processing)?
  *Hint: Use concise per-character checks, possibly regex, and provide instant feedback per keystroke where possible.*

### Summary
This solution sequentially checks each email for syntax conformity without relying on regex or libraries, making it robust for interviews and extensions. The underlying pattern is **string parsing/validation**, common in form validation, batch input cleaning, and custom filters. The coding style is clear and each check is independently modular, which applies easily to other validation or parsing tasks.


### Flashcard
For each email, verify: exactly one '@', alphanumeric/underscore before '@', letters only in domain, ends with '.com'; return valid emails.

### Tags
Database(#database)

### Similar Problems
