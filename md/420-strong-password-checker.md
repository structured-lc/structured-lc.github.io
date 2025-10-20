### Leetcode 420 (Hard): Strong Password Checker [Practice](https://leetcode.com/problems/strong-password-checker)

### Description  
You are given a password, and must determine the *minimum number of changes* needed to make it strong.  
A strong password satisfies all these:
- Length is between **6 and 20** (inclusive)
- Contains at least one lowercase letter, one uppercase letter, and one digit
- Has **no** sequence of three or more repeating characters (like `"aaa"`, `"111"`, etc.)

Each change can insert, delete, or replace a character.  
Return how many changes are needed to make the password strong.

### Examples  

**Example 1:**  
Input: `aA123`  
Output: `1`  
*Explanation: The length is only 5, so we must insert at least one character. All character types are present, and no repeats. One change is enough (add anything).*

**Example 2:**  
Input: `aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzzAB1234567890999`  
Output: `31`  
*Explanation: Length is 62 (>20), so at least 42 deletions required. Multiple repeat sequences, so replacements too. The minimum to meet all criteria is 31 changes.*

**Example 3:**  
Input: `aaaaaa`  
Output: `2`  
*Explanation: Length is 6, so it's OK, but there are two sequences of three identical ('aaa' and 'aaa'), so two replacements are needed for breaking them (e.g., "aababa").*


### Thought Process (as if you’re the interviewee)  
Start by analyzing all the requirements:

- Check the **length**:
    - If too short (<6), insert characters (could break up repeats or fill missing types)
    - If too long (>20), delete extra characters (could use deletions to break up repeats efficiently)
- Check for **missing character types** (lower, upper, digit): each missing type needs one change
- **Repeating characters** (three in a row): every such group of len≥3 needs to be broken up (by replace/delete/insert)

**First step:**  
Count how many character types are missing.

**Second step:**  
Find all repeat sequences of size ≥3 and note their lengths.

**If length < 6:**  
- Insert the max(missing_types, 6 - n) (as each insertion can both fill missing types and break repeats).

**If 6 ≤ length ≤ 20:**  
- Replace as needed: max(missing_types, total_repeat_corrections) (where each correction breaks a repeating group by 1)

**If length > 20:**  
- Have to delete (n - 20) characters.  
- Optimize deletions in repeating groups to reduce number of replacements needed (deleting inside repeats is better than just deleting randomly).
- After all deletions, sum up the replacements, then answer is deletions + max(missing_types, replacements left).

This greedy approach ensures we minimize total changes using the allowed actions.

### Corner cases to consider  
- Password with length exactly 6, with or without required character types
- Password with only one character, like `a`, `1`, `A`
- Very long passwords, all made of repeats, or all missing types
- Password already valid (return 0)
- Multiple overlapping repeating triples
- Passwords where removing characters can also solve repeats

### Solution

```python
def strongPasswordChecker(password: str) -> int:
    n = len(password)
    
    # Check for missing types
    has_lower = any('a' <= c <= 'z' for c in password)
    has_upper = any('A' <= c <= 'Z' for c in password)
    has_digit = any(c.isdigit() for c in password)
    missing_types = 3 - (has_lower + has_upper + has_digit)
    
    # Find sequences of 3 or more same character
    repeats = []
    i = 2
    count = 2
    while i < n:
        if password[i] == password[i-1] == password[i-2]:
            j = i + 1
            while j < n and password[j] == password[i]:
                j += 1
            repeats.append(j - (i-2)) # length of repeated block
            i = j
            count = 2
        else:
            i += 1
    
    total_replacements = 0
    lens = []
    i = 0
    # Identify lengths of every repeated sequence
    while i < n:
        j = i
        while j < n and password[j] == password[i]:
            j += 1
        if j - i >= 3:
            lens.append(j - i)
        i = j

    if n < 6:
        # Short password case
        return max(missing_types, 6 - n)
    elif n <= 20:
        # Just do replacements for repeats and missing types
        replace = 0
        for l in lens:
            replace += l // 3
        return max(replace, missing_types)
    else:
        # Need deletions!
        to_delete = n - 20
        replace = 0
        lens.sort(reverse=True)
        
        nums = [0]*3  # For mod 3 buckets
        for l in lens:
            nums[l % 3] += 1

        del_left = to_delete

        # Step 1: Try to delete from mod 0 buckets first, greedily
        for i in range(3):
            if i == 2: step = 3
            else: step = i + 1
            for _ in range(nums[i]):
                if del_left <= 0:
                    break
                need = step
                take = min(del_left, need)
                del_left -= take
                l_curr = i + 3    # l mod 3 == i, so min group is i+3
                if take == need:
                    replace += (l_curr - take) // 3
                else:
                    replace += (l_curr - take) // 3 + 1

        # Now remove the replaced ones, and deletions to groups not enough to remove whole repeat
        # After all deletions, whatever's left needs replacement
        replace += sum([(l - to_delete) // 3 if l - to_delete >= 3 else 0 for l in lens])

        return (n - 20) + max(missing_types, replace)

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of the password.  
  We scan the password for character types, for repeats, and then process repeats—each step linear.
- **Space Complexity:** O(n) in the worst case (for the repeats arrays and mod buckets), but typically O(1) extra, aside from input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if only *insert* or *replace* operations were allowed, but not *delete*?  
  *Hint: Consider the required length constraint and how to split repeat groups.*

- Can this be solved in-place, modifying the string itself, rather than just counting changes?  
  *Hint: Try simulating the step-by-step changes as you scan.*

- What if the required character set was larger or more complicated (e.g., special symbols)?  
  *Hint: Adapt the missing_types logic for more categories.*

### Summary
This problem leverages a **greedy algorithm** and careful case analysis, combining string scanning, sequence parsing, and length-focused optimizations.  
The pattern—checking validations, then greedy edits—is widely applicable for “text correction” tasks and password/validation engines generally.


### Flashcard
Balance three constraints (length, missing types, repeating chars)—use deletions efficiently by prioritizing repeat groups where len%3==0 (deleting 1 breaks repeat and reduces length optimally).

### Tags
String(#string), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Strong Password Checker II(strong-password-checker-ii) (Easy)