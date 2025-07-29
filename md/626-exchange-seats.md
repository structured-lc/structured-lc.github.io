### Leetcode 626 (Medium): Exchange Seats [Practice](https://leetcode.com/problems/exchange-seats)

### Description  
Given a table `Seat` with two columns: `id` (seat number, starting from 1 and always increasing by 1, i.e., consecutive integers) and `student` (student names), **swap the seats of every pair of consecutive students**. Student with `id=1` swaps with `id=2`, `id=3` swaps with `id=4`, and so on.  
If there is an **odd number of students**, the student in the last seat remains unmoved.

### Examples  

**Example 1:**  
Input:  
Seat table:  
| id | student |
|----|---------|
| 1  | A       |
| 2  | B       |
| 3  | C       |
| 4  | D       |
| 5  | E       |

Output:  
| id | student |
|----|---------|
| 1  | B       |
| 2  | A       |
| 3  | D       |
| 4  | C       |
| 5  | E       |

*Explanation:  
A and B switch places, so id=1 becomes B, id=2 becomes A.  
C and D also swap, so id=3 becomes D, id=4 becomes C.  
E is alone (odd number of entries), so id=5 stays E.*

**Example 2:**  
Input:  
Seat table:  
| id | student |
|----|---------|
| 1  | X       |
| 2  | Y       |

Output:  
| id | student |
|----|---------|
| 1  | Y       |
| 2  | X       |

*Explanation:  
X and Y swap seats, so id=1 gets Y and id=2 gets X.*

**Example 3:**  
Input:  
Seat table:  
| id | student |
|----|---------|
| 1  | Foo     |

Output:  
| id | student |
|----|---------|
| 1  | Foo     |

*Explanation:  
Only one row, so nothing to swap.*

### Thought Process (as if you’re the interviewee)  

First, I want to **swap the student names for every adjacent pair** of ids (1⟷2, 3⟷4, etc).  
My naive approach is to iterate through the sorted list by id and for every even index, swap with the previous odd index. If the length is odd, the last student remains unchanged.

- **Brute-force:** Use a for loop, and for each pair (i, i+1), swap their positions.
- **Optimization:** Since ids are consecutive starting from 1, we can use the ids to perform swaps directly. For odd ids, if (id+1) exists, use student from (id+1). For even ids, use student from (id-1). If the id is the last and odd and has no pair, keep as is.

This logic makes the implementation linear and covers all cases.

**Why this approach?**  
- Iterating and swapping in-place works because ids are consecutive and unique.
- No nested loops are required, so time complexity stays O(n).
- SQL and Python solution both rely on direct index/id manipulation.

### Corner cases to consider  
- No students (empty table/list)
- Only one student
- Even number of students
- Odd number of students (last remains untouched)
- Unusual ids (e.g., not starting from 1) ⇒ *but per problem statement, ids are 1,2,...*

### Solution

```python
def exchange_seats(seats):
    """
    seats: List of [id, student] pairs, sorted by id
    Returns: New list with students swapped as required
    """
    n = len(seats)
    # Copy to avoid modifying original
    result = seats[:]
    i = 0
    while i + 1 < n:
        # Swap adjacent pairs
        result[i][1], result[i+1][1] = result[i+1][1], result[i][1]
        i += 2
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each entry is inspected once, swaps are O(1).
- **Space Complexity:** O(n) — Output list must store the same number of rows as input, but no extra storage or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the ids were not consecutive?
  *Hint: Sort by id, then pair by positions.*
- How would you swap by k seats instead of 2 (generalized k-swap)?
  *Hint: Process in groups of k, reverse or rearrange the group per rules.*
- How would you do it efficiently in SQL?
  *Hint: Use CASE WHEN and id arithmetic (id%2), possibly join with itself on id+1/id-1.*

### Summary  
This problem uses the **pairwise swapping pattern** based on indices or identifiers.  
The key trick is mapping each id to its swap target using simple arithmetic, so the solution is linear and does not require auxiliary data structures.  
This is a common pattern—pairwise manipulation, window sliding, or adjacent transpositions—and is useful in problems with seatings, pairings, or matching.