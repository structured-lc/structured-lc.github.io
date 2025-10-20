### LeetCode 619 (Easy): Biggest Single Number [Practice](https://leetcode.com/problems/biggest-single-number)

### Description  
The **Biggest Single Number** problem involves finding the largest number in a table that appears only once. If no such number exists, the solution should return `null`.

### Examples  

**Example 1:**  
Input:`my_numbers table with numbers: 88, 331, 456, 6`  
Output=`6`  
*Explanation: The numbers 88 and 331 are not single numbers because they appear more than once. However, 6 is the largest number that appears only once.*

**Example 2:**  
Input=`my_numbers table with all numbers repeated`  
Output=`null`  
*Explanation: Since every number appears more than once, there is no single number, and thus the output is `null`.*

**Example 3:**  
Input=`my_numbers table with numbers: 1, 4, 5, 6 where each appears only once`  
Output=`6`  
*Explanation: In this case, all numbers are single numbers, so the largest single number is 6.*

### Thought Process  
To solve this problem, we can start by considering a brute-force approach, which involves iterating through each number and checking its frequency. However, a more efficient approach is to use SQL to group the numbers by their value and count the occurrences of each number. Then, we can select the maximum number that appears only once.

1. **Brute Force:** Iterate through each number, count its occurrences, and keep track of the largest number that appears once.
2. **Optimized Approach:** Use SQL to group numbers by their value and count occurrences. Then select the maximum number with a count of one.

We choose the optimized SQL approach because it scales better for large datasets and leverages SQL's built-in grouping and aggregation capabilities.

### Corner cases to consider  
- **Empty Table:** If the input table is empty, the output should be `null`.
- **All Numbers Repeated:** If all numbers appear more than once, the output should be `null`.
- **Single Element:** If there's only one number in the table, and it's the only occurrence, the output should be that number.

### Solution  
```python
def biggest_single_number(my_numbers):
    count_dict = {}
    
    # Count occurrences of each number
    for num in my_numbers:
        if num in count_dict:
            count_dict[num] += 1
        else:
            count_dict[num] = 1
    
    # Find the largest number occurring once
    max_single_num = None
    for num, count in count_dict.items():
        if count == 1 and (max_single_num is None or num > max_single_num):
            max_single_num = num
    
    return max_single_num

# Assuming my_numbers is a list of numbers as shown in examples
```

Alternatively, if you have a SQL database, you can use the following SQL query:

```sql
SELECT MAX(num) AS num
FROM (
    SELECT num, COUNT(*) as count_num
    FROM my_numbers
    GROUP BY num
) AS subquery
WHERE count_num = 1;
```

### Time and Space complexity Analysis  

- **Time Complexity:** The time complexity of the Python solution is O(n), where n is the number of elements in the input list. This is because we iterate through the list once to count occurrences and once more to find the maximum single number.
- **Space Complexity:** The space complexity is O(n) due to the dictionary used to store counts.

For the SQL query, the time complexity depends on the database's query execution plan, but typically it involves a single pass through the data (O(n)) for grouping and counting.

### Potential follow-up questions  

- (1) How would you modify the SQL query to handle cases where the input table is extremely large and cannot fit into memory?  
  *Hint: Consider distributing the data across multiple tables or using window functions if available.*

- (2) Write a version of the Python solution that uses a `Counter` object from the `collections` module.  
  *Hint: Use `Counter` to simplify the count operation and then iterate through its items to find the maximum single number.*

- (3) How would you optimize the database query if it is part of a larger, more complex query?  
  *Hint: Consider using indexes on the `num` column and optimizing join operations if applicable.*

### Summary  
The **Biggest Single Number** problem is solved using either a Python iteration approach or an optimized SQL query. The SQL approach is more scalable for large datasets due to its ability to leverage database indexing and grouping capabilities. This problem follows a common pattern of counting and filtering, which can be applied to various data analysis tasks.


### Flashcard
Group numbers, count occurrences, and select the largest number that appears exactly once.

### Tags
Database(#database)

### Similar Problems
