### Leetcode 2480 (Easy): Form a Chemical Bond [Practice](https://leetcode.com/problems/form-a-chemical-bond)

### Description  
Given a table of elements, each with a symbol and type (either 'Metal', 'Nonmetal', or 'Noble'), return all possible pairs where a bond can be formed between a metal and a nonmetal.  
For every 'Metal' element, form a pair with every 'Nonmetal' element. Each pair is represented by the metal's symbol and the nonmetal's symbol. Ignore pairs involving 'Noble' elements, or pairs of two metals / two nonmetals.

### Examples  

**Example 1:**  
Input:  
Elements table:  
| symbol | type     |
|--------|----------|
| Na     | Metal    |
| Cl     | Nonmetal |
| Ca     | Metal    |
| O      | Nonmetal |
| Ne     | Noble    |

Output:  
| metal | nonmetal |
|-------|----------|
| Na    | Cl       |
| Na    | O        |
| Ca    | Cl       |
| Ca    | O        |

*Explanation: All possible pairings where the first element is 'Metal' and the second is 'Nonmetal'. 'Ne' (Noble) is ignored.*

**Example 2:**  
Input:  
Elements table:  
| symbol | type     |
|--------|----------|
| H      | Nonmetal |
| K      | Metal    |

Output:  
| metal | nonmetal |
|-------|----------|
| K     | H        |

*Explanation: Only one possible pairing: K is metal, H is nonmetal.*

**Example 3:**  
Input:  
Elements table:  
| symbol | type     |
|--------|----------|
| He     | Noble    |
| Ar     | Noble    |

Output:  
(empty)

*Explanation: No metals or nonmetals are present, so no valid pairs.*

### Thought Process (as if you’re the interviewee)  
The task is to generate all pairs of elements where one is a metal and the other is a nonmetal.  
- **Brute-force**: Loop through each element and check all possible pairs, picking those with different types. However, we only care about 'Metal' with 'Nonmetal' pairs, never metal-metal or nonmetal-nonmetal.
- **Simplify**: For each row where type='Metal', pair it with all rows where type='Nonmetal'. This is a classic relational database join problem, which can be directly solved with a self-join in SQL.
- **Trade-offs**: This approach checks all possible cross combinations, but in the context of a database, this is efficient since we only join filtered subsets.  
- An advantage is that the logic is clear and results in a concise query.

### Corner cases to consider  
- No metals or no nonmetals: Output will be empty.
- Only one metal and one nonmetal: Only one pair.
- More than one metal and/or more than one nonmetal: All cross pairings between them should be returned.
- Elements of type 'Noble': Never appear in any output.
- Input table contains duplicate rows: Should still return all valid pairings.

### Solution

```sql
-- For each metal, pair it with every nonmetal.
SELECT
    A.symbol AS metal,
    B.symbol AS nonmetal
FROM
    Elements A,
    Elements B
WHERE
    A.type = 'Metal'
    AND B.type = 'Nonmetal'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of metals and n is the number of nonmetals. Each possible pairing is considered.
- **Space Complexity:** O(m × n) for the output (cross product of all metals and nonmetals), but only constant extra space is used in computation beyond that since it’s a join.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to **avoid duplicate bonds** (e.g., treat (A,B) and (B,A) as the same)?
  *Hint: Enforce lexicographical order or only output (metal, nonmetal) pairs.*

- How would you **extend** this if the table included another type, like 'Metalloid'?
  *Hint: Adjust the filtering criteria in the WHERE clause.*

- Can you **handle huge tables efficiently**?
  *Hint: Consider adding indexes on the 'type' column for faster filtering, or restricting output with a LIMIT if appropriate.*

### Summary
This problem uses the **Cross Join (Self-Join) pattern**, paired with filter predicates.  
It is a classic scenario in SQL where you need to combine all possible matches under specific rules.  
The solution is highly reusable for problems involving pairing/filtering entities based on types, such as “employee with mentor of a different department” or “products matched with compatible components.”


### Flashcard
For each metal, pair with every nonmetal; this is a classic cross-join filtered by type.

### Tags
Database(#database)

### Similar Problems
