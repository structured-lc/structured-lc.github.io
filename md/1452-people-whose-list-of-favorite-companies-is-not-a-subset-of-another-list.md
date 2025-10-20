### Leetcode 1452 (Medium): People Whose List of Favorite Companies Is Not a Subset of Another List [Practice](https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list)

### Description  
Given a list of people, each with a list of their favorite companies (as strings), identify the people whose list is **not** a subset of anyone else’s list.  
That is, for each person, if **all** their favorite companies can be found in some other person’s list (excluding themselves), they do **not** qualify.  
Return the indices of the qualifying people, sorted in increasing order.

### Examples  

**Example 1:**  
Input: `favoriteCompanies = [["leetcode","google","facebook"], ["google","microsoft"], ["google","facebook"], ["google"], ["amazon"]]`  
Output: `[0,1,4]`  
*Explanation:*
- Person 0: ["leetcode","google","facebook"] is **not** a subset of any other.
- Person 1: ["google","microsoft"] is **not** a subset of any other.
- Person 2: ["google","facebook"] **is** a subset of person 0's list.
- Person 3: ["google"] is a subset of persons 0, 1, 2.
- Person 4: ["amazon"] is unique.

**Example 2:**  
Input: `favoriteCompanies = [["leetcode"], ["google"], ["facebook"], ["amazon"]]`  
Output: `[0,1,2,3]`  
*Explanation:*
Every person's list is unique and not a subset of any other.

**Example 3:**  
Input: `favoriteCompanies = [["leetcode","google"], ["google","leetcode"], ["google"], ["leetcode"]]`  
Output: `[0,1]`  
*Explanation:*
- Person 0: ["leetcode","google"]
- Person 1: ["google","leetcode"] — both lists are identical and thus not strict subsets.
- Person 2: ["google"] is a subset of both 0 and 1.
- Person 3: ["leetcode"] is a subset of both 0 and 1.

### Thought Process (as if you’re the interviewee)  
- The **brute-force** approach is to compare each person's list with every other person's list, checking if their list is a subset of any other. If not, collect their index.
- Comparing string lists directly is slow; instead, use a set for each person, so set operations like `.issubset()` are O(min(m, n)).
- For every person i, for every j ≠ i, check if set_i ⊆ set_j. If any such j exists, skip i. Otherwise, i is part of the answer.
- Optimization: Pre-processing all lists as sets for fast subset checking, early exit the inner loop when a subset is found.
- Sorting the output indices isn't strictly required if we process indices in order.

**Why not use bitmasking?**
- Because there is no fixed small universe of possible companies—the set of company strings can be large and arbitrary.

**Trade-offs:**  
- Time complexity can approach O(n²·m), with n the number of people and m the average number of companies per person.
- For n up to ~100 and m up to ~500, this is acceptable.

### Corner cases to consider  
- Some or all favorite company lists are empty.
- All lists are identical.
- Multiple lists are identical (should not be considered subsets of themselves, only strict subsets).
- Lists with partial overlaps but not true subsets.
- Very large input lists.
- Companies with the same name in different cases (if input allows it).

### Solution

```python
def peopleIndexes(favoriteCompanies):
    # Convert all lists to sets for O(1) subset checking
    sets = [set(companies) for companies in favoriteCompanies]
    n = len(sets)
    result = []
    
    for i in range(n):
        is_subset = False
        for j in range(n):
            if i == j:
                continue
            # If set i is a strict subset of set j, mark and break
            if sets[i].issubset(sets[j]) and len(sets[i]) < len(sets[j]):
                is_subset = True
                break
        if not is_subset:
            result.append(i)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²·m)  
  - For each person n, we check against every other (n-1) people.
  - Each subset comparison (set A ⊆ set B) is O(m), where m is the max length of a list.
- **Space Complexity:** O(n·m)  
  - We store n sets of up to m companies each (one per person).
  - Plus O(1) for result storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of unique companies is very large (say, hundreds of thousands)?
  *Hint: Can you encode sets more compactly than Python sets? Consider hashing or bitsets if universe is small enough.*

- How would you optimize for streaming input or repeated queries?
  *Hint: Could you use a trie or prefix tree for subset lookups?*

- How would you deal with case-insensitivity or typos in company names?
  *Hint: Preprocessing input via normalization or fuzzy string matching might be needed.*

### Summary
This is a classic **nested scan + subset** problem—convert lists to sets and check each set for being a subset of any other. This set-based approach is general, clear, and avoids superfluous complexity, optimizing for input sizes expected in interviews. This coding pattern (all-pairs subset checking with sets) generalizes to intersection, superset, and anti-chain problems in set theory.


### Flashcard
For each person, check if their favorite companies set is not a subset of any other person's set; collect such indices.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
