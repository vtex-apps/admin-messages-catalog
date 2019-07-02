import { Query } from 'react-apollo'
import GetUserEmail from '../graphql/GetUserEmail.graphql'

export interface EmailData {
  topbarData : {
    profile? : {
      email? : string
    }
  }
}

class GetUserEmailQuery extends Query<EmailData> {
  public static defaultProps = {
    query: GetUserEmail,
  }
}

export default GetUserEmailQuery
