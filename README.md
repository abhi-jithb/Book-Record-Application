# server
* for storing certain data
* user register 
* subscribe

This is a book recond management API server/ Back-end for the library system or managent of records or manuals or books

Fine system:
user: 06/03/2024 - 06/06/2024 (valid time)
if the user submitted the valid time( 50* no.of days)

## Subcription Types
1. 3 Months (BASIC)
2. 6 Months (STANDARD)
3. 12 Months (PREMIUM)

Example
>> Book-1
>> BASIC
>> 06/03/2024 - subscription date
>> 07/06/2024 - renewal date
>> if user try to pay after renewal date : 50 * (no.of days after rewal date)
>> if user buys multiple books and along with  book-1 
  * should pay (book-1 fine + other books fine + subscription amt)

>>missed by renewal date: 50/-
>>missed by subscription date: 100/-
>>missed by renewal && subscription date: 150/-

### Routers and Endpoints

## /users/{id}
GET: Get a user id
PUT: Update user by their id
DELETE: Delete user by id (before deleting check whether he/she will have issued book && check for any fine to be paid)

## user/subscription/{id}
 GET: Get user subscription-details
 * Date of subsciption
 * validity
 * Is there any fines

 ## /books
 GET: Get all the books
 POST:Create/add a new book

## /books/{id}
 GET: Get all the books by id
 PUT: Update a book by id

## /books/issued
GET: Get all issued books with their fines