### Leetcode 3204 (Medium): Bitwise User Permissions Analysis [Practice](https://leetcode.com/problems/bitwise-user-permissions-analysis)

### Description  
Given a table `user_permissions` with columns `user_id` (int) and `permissions` (int), where each bit in `permissions` represents a different privilege or function a user may have, analyze the permissions bitmask across all users:

- Find **common_perms**: A bitmask representing permissions that *every user* has.
- Find **any_perms**: A bitmask representing permissions that *at least one user* has.

Essentially, you need to compute the bitwise AND and bitwise OR of the `permissions` for all users.

### Examples  

**Example 1:**  
Input:  
`user_permissions` =  
| user_id | permissions |
|---------|------------|
|    1    |     5      |
|    2    |    12      |
|    3    |     7      |
|    4    |     3      |

Output: `common_perms = 0`, `any_perms = 15`  
Explanation:  
- User permissions in binary: 5 (0101), 12 (1100), 7 (0111), 3 (0011)  
- Bitwise AND: 0101 & 1100 & 0111 & 0011 = 0000 (that is, 0)  
- Bitwise OR:  0101 | 1100 | 0111 | 0011 = 1111 (that is, 15)

**Example 2:**  
Input:  
`user_permissions` =  
| user_id | permissions |
|---------|------------|
|    1    |     7      |
|    2    |     7      |

Output: `common_perms = 7`, `any_perms = 7`  
Explanation:  
- Both users have permissions 7 (binary 0111)  
- AND: 0111 & 0111 = 0111  
- OR: 0111 | 0111 = 0111

**Example 3:**  
Input:  
`user_permissions` =  
| user_id | permissions |
|---------|------------|
|    1    |     8      |
|    2    |     4      |
|    3    |     1      |

Output: `common_perms = 0`, `any_perms = 13`  
Explanation:  
- Binary: 8 (1000), 4 (0100), 1 (0001)
- AND: 1000 & 0100 & 0001 = 0000  
- OR: 1000 | 0100 | 0001 = 1101 (that is, 13)

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force way:  
- For each permission bit (suppose max 32 bits for int), check each bit position across all users one by one, and use a counter to see if that bit is always set (for AND) or set at least once (for OR).

That's O(M×N), where N = number of users and M = number of bits, but we can do better.

- Because computers support direct bitwise operations, aggregate by simply AND or OR as you scan each permissions value:

  - Maintain `curr_and` (initialize as all 1’s or with the first value), and for every user, `curr_and = curr_and & permissions`.
  - Similarly, for OR, `curr_or = curr_or | permissions`.

- Both can be calculated in a single scan (O(N)), and SQL supports BIT_AND and BIT_OR for this purpose.

This is optimal for interview and real-world usage, because it is both easy and efficient.  
Trade-off: This uses aggregation, not indexable for any querying, but this is fine for an analysis query as in this problem.

### Corner cases to consider  
- Only one user: AND and OR will be the permissions of that user.
- All 0s: AND and OR both zero.
- Non-overlapping permissions: AND will be 0, OR will be the bitwise sum.
- Very large integers (ensure no overflow for high bit positions).
- Empty table: (Problem statement may not define; typically, this should return null or special handling.)

### Solution

```python
# Emulate the computation in Python for reasoning, though the LeetCode solution is SQL.
# Given a list of permissions, output common_perms (AND) and any_perms (OR).

def analyze_user_permissions(permissions):
    if not permissions:
        # Edge case: No data
        return 0, 0

    common_perms = permissions[0]
    any_perms = permissions[0]
    for p in permissions[1:]:
        common_perms = common_perms & p
        any_perms = any_perms | p
    return common_perms, any_perms

# Example:
perms = [5, 12, 7, 3]
print(analyze_user_permissions(perms))
# Output: (0, 15)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One scan through the n users, doing O(1) work per user.
- **Space Complexity:** O(1) — No extra space used apart from the two aggregate integers (`common_perms`, `any_perms`).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the permissions values are extremely large (e.g., 64 bits or more)?  
  *Hint: Can your solution adapt to arbitrary bit lengths?*

- Can you extend this to a grouped analysis (e.g., by department)?  
  *Hint: Use GROUP BY for the SQL version; batch for Python version.*

- How would you handle real-time updates in permissions — is there a way to incrementally maintain AND/OR aggregates?  
  *Hint: Think about incremental aggregation and how to update these aggregates efficiently for streaming data.*

### Summary
This problem is a classic *aggregation with bitwise operations* pattern, commonly found in permissions/feature flag analysis and bitmap indexes. The solution relies on O(n) single-pass bitwise reduction (AND/OR), which is both elegant and highly efficient, directly suited for SQL’s `BIT_AND`, `BIT_OR` functions and extremely easy to implement with for-loops in Python as shown. This pattern can be leveraged in any domain where boolean features are stored as bitmasks and global or grouped analysis is needed.

### Tags
Database(#database)

### Similar Problems
